const Category = require('./category.model')
const { success, error } = require('../../utils/response')

const getAll = async (req, res) => {
  try {
    const { type } = req.query
    const filter = type ? { type } : {}
    const categories = await Category.find(filter).sort({ createdAt: -1 })
    return success(res, categories)
  } catch (err) { return error(res, err.message) }
}

const create = async (req, res) => {
  try {
    const cat = await Category.create(req.body)
    return success(res, cat, 'Category created', 201)
  } catch (err) { return error(res, err.message) }
}

const update = async (req, res) => {
  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!cat) return error(res, 'Category not found', 404)
    return success(res, cat, 'Category updated')
  } catch (err) { return error(res, err.message) }
}

const remove = async (req, res) => {
  try {
    const cat = await Category.findByIdAndDelete(req.params.id)
    if (!cat) return error(res, 'Category not found', 404)
    return success(res, null, 'Category deleted')
  } catch (err) { return error(res, err.message) }
}

module.exports = { getAll, create, update, remove }
