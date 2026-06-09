const mongoose = require('mongoose')

const quotationDownloadSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
    packageTitle: { type: String, required: true, trim: true },
    packageDuration: { type: String, default: '' },
    packagePrice: { type: Number, default: 0 },
    packageType: { type: String, default: '' },
    sourceUrl: { type: String, default: '', maxlength: 500 },
    status: { type: String, enum: ['new', 'contacted'], default: 'new' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('QuotationDownload', quotationDownloadSchema)
