const Search = require('./search.model')
const { success, error, paginated } = require('../../utils/response')

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 50, selectedType, search } = req.query
    const filter = {}
    if (selectedType) filter.selectedType = selectedType
    if (search) filter.query = { $regex: search, $options: 'i' }
    const total = await Search.countDocuments(filter)
    const searches = await Search.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit))
    return paginated(res, searches, total, page, limit)
  } catch (err) { return error(res, err.message) }
}

const create = async (req, res) => {
  try {
    const item = await Search.create({
      ...req.body,
      userAgent: req.headers['user-agent'] || '',
      ip: req.ip || '',
    })
    return success(res, item, 'Search saved', 201)
  } catch (err) { return error(res, err.message) }
}

const remove = async (req, res) => {
  try {
    await Search.findByIdAndDelete(req.params.id)
    return success(res, null, 'Search deleted')
  } catch (err) { return error(res, err.message) }
}

module.exports = { getAll, create, remove }
