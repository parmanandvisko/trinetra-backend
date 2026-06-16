const Booking = require('./booking.model')
const { success, error, paginated } = require('../../utils/response')

const normalizeBookingPayload = (payload) => {
  const next = { ...payload }
  const hasGuestCount = payload.adults !== undefined || payload.children !== undefined || payload.numberOfGuests !== undefined
  if (hasGuestCount && payload.numberOfGuests === undefined) {
    next.numberOfGuests = Number(payload.adults || 0) + Number(payload.children || 0)
  }
  if (payload.invoiceAmount === undefined && payload.totalAmount !== undefined) {
    next.invoiceAmount = payload.totalAmount
  }
  return next
}

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query
    const filter = {}
    if (status) filter.status = status
    if (search) {
      const query = { $regex: search, $options: 'i' }
      filter.$or = [
        { name: query },
        { email: query },
        { phone: query },
        { destination: query },
        { bookingRefNo: query },
        { voucherNo: query },
        { invoiceNo: query },
      ]
    }
    const total = await Booking.countDocuments(filter)
    const bookings = await Booking.find(filter).populate('package', 'title price').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit))
    return paginated(res, bookings, total, page, limit)
  } catch (err) { return error(res, err.message) } 
}

const create = async (req, res) => {
  try {
    const booking = await Booking.create(normalizeBookingPayload(req.body))
    return success(res, booking, 'Booking created', 201)
  } catch (err) { return error(res, err.message) }
}

const update = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (!booking) return error(res, 'Booking not found', 404)
    Object.assign(booking, normalizeBookingPayload(req.body))
    await booking.save()
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
