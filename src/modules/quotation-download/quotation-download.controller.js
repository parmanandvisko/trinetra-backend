const mongoose = require('mongoose')
const Package = require('../package/package.model')
const QuotationDownload = require('./quotation-download.model')
const { success, error, paginated } = require('../../utils/response')

const normalizePhone = (value = '') => String(value).replace(/[^\d+]/g, '')

const isValidPhone = (value) => /^\+?\d{10,15}$/.test(value)

const normalizeSourceUrl = (value = '') => {
  const sourceUrl = String(value).trim()
  return /^https?:\/\//i.test(sourceUrl) ? sourceUrl.slice(0, 500) : ''
}

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query
    const filter = {}

    if (status) filter.status = status
    if (search) {
      filter.$or = [
        { phone: { $regex: search, $options: 'i' } },
        { packageTitle: { $regex: search, $options: 'i' } },
      ]
    }

    const total = await QuotationDownload.countDocuments(filter)
    const downloads = await QuotationDownload.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))

    return paginated(res, downloads, total, page, limit)
  } catch (err) {
    return error(res, err.message)
  }
}

const create = async (req, res) => {
  try {
    const phone = normalizePhone(req.body.phone)
    const packageId = req.body.packageId

    if (!isValidPhone(phone)) return error(res, 'Enter a valid mobile number', 400)
    if (!mongoose.isValidObjectId(packageId)) return error(res, 'Invalid package', 400)

    const pkg = await Package.findById(packageId)
    if (!pkg || !pkg.isActive) return error(res, 'Package not found', 404)

    const download = await QuotationDownload.create({
      phone,
      package: pkg._id,
      packageTitle: pkg.title,
      packageDuration: pkg.duration,
      packagePrice: pkg.price,
      packageType: pkg.type,
      sourceUrl: normalizeSourceUrl(req.body.sourceUrl),
    })

    return success(res, download, 'Quotation download recorded', 201)
  } catch (err) {
    return error(res, err.message)
  }
}

const updateStatus = async (req, res) => {
  try {
    const download = await QuotationDownload.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    )
    if (!download) return error(res, 'Quotation download not found', 404)
    return success(res, download, 'Status updated')
  } catch (err) {
    return error(res, err.message)
  }
}

const remove = async (req, res) => {
  try {
    const download = await QuotationDownload.findByIdAndDelete(req.params.id)
    if (!download) return error(res, 'Quotation download not found', 404)
    return success(res, null, 'Quotation download deleted')
  } catch (err) {
    return error(res, err.message)
  }
}

module.exports = { getAll, create, updateStatus, remove }
