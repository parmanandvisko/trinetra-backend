const Destination = require('./destination.model')
const { success, error, paginated } = require('../../utils/response')

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, isFeature, isActive } = req.query
    const filter = {}
    if (category) filter.category = category
    if (isFeature !== undefined) filter.isFeature = isFeature === 'true'
    if (isActive !== undefined) filter.isActive = isActive === 'true'
    if (search) filter.name = { $regex: search, $options: 'i' }
    const total = await Destination.countDocuments(filter)
    const destinations = await Destination.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit))
    return paginated(res, destinations, total, page, limit)
  } catch (err) { return error(res, err.message) }
}

const getOne = async (req, res) => {
  try {
    const dest = await Destination.findById(req.params.id)
    if (!dest) return error(res, 'Destination not found', 404)
    return success(res, dest)
  } catch (err) { return error(res, err.message) }
}

const create = async (req, res) => {
  try {
    const dest = await Destination.create(req.body)
    return success(res, dest, 'Destination created', 201)
  } catch (err) { return error(res, err.message) }
}

const update = async (req, res) => {
  try {
    const dest = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!dest) return error(res, 'Destination not found', 404)
    return success(res, dest, 'Destination updated')
  } catch (err) { return error(res, err.message) }
}

const remove = async (req, res) => {
  try {
    const dest = await Destination.findByIdAndDelete(req.params.id)
    if (!dest) return error(res, 'Destination not found', 404)
    return success(res, null, 'Destination deleted')
  } catch (err) { return error(res, err.message) }
}

module.exports = { getAll, getOne, create, update, remove }
