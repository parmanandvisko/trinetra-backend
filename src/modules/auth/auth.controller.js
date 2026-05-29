const jwt = require('jsonwebtoken')
const Admin = require('./auth.model')
const { success, error } = require('../../utils/response')

const generateToken = (id, email, role) =>
  jwt.sign({ id, email, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return error(res, 'Email and password required', 400)

    const admin = await Admin.findOne({ email, isActive: true })
    if (!admin || !(await admin.matchPassword(password)))
      return error(res, 'Invalid credentials', 401)

    const token = generateToken(admin._id, admin.email, admin.role)
    return success(res, { token, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role, avatar: admin.avatar } }, 'Login successful')
  } catch (err) {
    return error(res, err.message)
  }
}

// GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password')
    return success(res, admin)
  } catch (err) {
    return error(res, err.message)
  }
}

// POST /api/auth/seed  (creates first admin — disable in production)
const seedAdmin = async (req, res) => {
  try {
    const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL })
    if (exists) return success(res, null, 'Admin already exists')
    const admin = await Admin.create({
      name: 'Super Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'superadmin',
    })
    return success(res, { email: admin.email }, 'Admin seeded successfully', 201)
  } catch (err) {
    return error(res, err.message)
  }
}

module.exports = { login, getMe, seedAdmin }
