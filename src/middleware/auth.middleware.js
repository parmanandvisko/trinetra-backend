const jwt = require('jsonwebtoken')
const { error } = require('../utils/response')

const protect = (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer '))
    return error(res, 'Not authorized, no token', 401)

  try {
    const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET)
    req.admin = decoded
    next()
  } catch {
    return error(res, 'Not authorized, invalid token', 401)
  }
}

module.exports = { protect }
