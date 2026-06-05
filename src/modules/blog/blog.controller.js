const Blog = require('./blog.model')
const { success, error, paginated } = require('../../utils/response')

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query
    const filter = {}
    if (status) filter.status = status
    if (search) filter.title = { $regex: search, $options: 'i' }
    const total = await Blog.countDocuments(filter)
    const blogs = await Blog.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit))
    return paginated(res, blogs, total, page, limit)
  } catch (err) { return error(res, err.message) }
}

const getOne = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) return error(res, 'Blog not found', 404)
    return success(res, blog)
  } catch (err) { return error(res, err.message) }
}

const create = async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return success(res, blog, 'Blog created', 201)
  } catch (err) { return error(res, err.message) }
}

const update = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!blog) return error(res, 'Blog not found', 404)
    return success(res, blog, 'Blog updated')
  } catch (err) { return error(res, err.message) }
}

const remove = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id)
    if (!blog) return error(res, 'Blog not found', 404)
    return success(res, null, 'Blog deleted')
  } catch (err) { return error(res, err.message) }
}

module.exports = { getAll, getOne, create, update, remove }
