const Gallery = require('./gallery.model')
const { success, error } = require('../../utils/response')

const getAll = async (req, res) => {
  try {
    const filter = {}
    if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === 'true'
    const items = await Gallery.find(filter).sort({ order: 1, createdAt: -1 })
    return success(res, items)
  } catch (err) {
    return error(res, err.message)
  }
}

const create = async (req, res) => {
  try {
    const item = await Gallery.create(req.body)
    return success(res, item, 'Gallery item created', 201)
  } catch (err) {
    return error(res, err.message)
  }
}

const update = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!item) return error(res, 'Gallery item not found', 404)
    return success(res, item, 'Gallery item updated')
  } catch (err) {
    return error(res, err.message)
  }
}

const remove = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id)
    if (!item) return error(res, 'Gallery item not found', 404)
    return success(res, null, 'Gallery item deleted')
  } catch (err) {
    return error(res, err.message)
  }
}

module.exports = { getAll, create, update, remove }
