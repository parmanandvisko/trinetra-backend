const Package = require('./package.model')
const { success, error, paginated } = require('../../utils/response')

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, isFeature, isActive, search } = req.query
    const filter = {}
    if (type) filter.type = type
    if (isFeature !== undefined) filter.isFeature = isFeature === 'true'
    if (isActive !== undefined) filter.isActive = isActive === 'true'
    if (search) filter.title = { $regex: search, $options: 'i' }
    const total = await Package.countDocuments(filter)
    const packages = await Package.find(filter).populate('destination', 'name').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit))
    return paginated(res, packages, total, page, limit)
  } catch (err) { return error(res, err.message) }
}

const getOne = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id).populate('destination')
    if (!pkg) return error(res, 'Package not found', 404)
    return success(res, pkg)
  } catch (err) { return error(res, err.message) }
}

const create = async (req, res) => {
  try {
    const pkg = await Package.create(req.body)
    return success(res, pkg, 'Package created', 201)
  } catch (err) { return error(res, err.message) }
}

const update = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!pkg) return error(res, 'Package not found', 404)
    return success(res, pkg, 'Package updated')
  } catch (err) { return error(res, err.message) }
}

const remove = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id)
    if (!pkg) return error(res, 'Package not found', 404)
    return success(res, null, 'Package deleted')
  } catch (err) { return error(res, err.message) }
}

module.exports = { getAll, getOne, create, update, remove }
