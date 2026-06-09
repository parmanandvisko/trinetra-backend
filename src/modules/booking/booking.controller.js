const Booking = require('./booking.model')
const { success, error, paginated } = require('../../utils/response')

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query
    const filter = {}
    if (status) filter.status = status
    if (search) filter.$or = [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }]
    const total = await Booking.countDocuments(filter)
    const bookings = await Booking.find(filter).populate('package', 'title price').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit))
    return paginated(res, bookings, total, page, limit)
  } catch (err) { return error(res, err.message) } 
}

const create = async (req, res) => {
  try {
    const booking = await Booking.create(req.body)
    return success(res, booking, 'Booking created', 201)
  } catch (err) { return error(res, err.message) }
}

const update = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!booking) return error(res, 'Booking not found', 404)
    return success(res, booking, 'Booking updated')
  } catch (err) { return error(res, err.message) }
}

const remove = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id)
    return success(res, null, 'Booking deleted')
  } catch (err) { return error(res, err.message) }
}

module.exports = { getAll, create, update, remove }
