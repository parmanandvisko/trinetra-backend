const Contact = require('./contact.model')
const { success, error, paginated } = require('../../utils/response')

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query
    const filter = status ? { status } : {}
    const total = await Contact.countDocuments(filter)
    const contacts = await Contact.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit))
    return paginated(res, contacts, total, page, limit)
  } catch (err) { return error(res, err.message) }
}

const create = async (req, res) => {
  try {
    const contact = await Contact.create(req.body)
    return success(res, contact, 'Message sent successfully', 201)
  } catch (err) { return error(res, err.message) }
}

const updateStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
    if (!contact) return error(res, 'Contact not found', 404)
    return success(res, contact, 'Status updated')
  } catch (err) { return error(res, err.message) }
}

const remove = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    return success(res, null, 'Contact deleted')
  } catch (err) { return error(res, err.message) }
}

module.exports = { getAll, create, updateStatus, remove }
