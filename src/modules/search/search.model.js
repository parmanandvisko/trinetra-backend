const mongoose = require('mongoose')

const searchSchema = new mongoose.Schema(
  {
    query: { type: String, default: '', trim: true },
    selectedType: { type: String, enum: ['destination', 'package', 'general'], default: 'general' },
    selectedName: { type: String, default: '' },
    selectedId: { type: String, default: '' },
    category: { type: String, default: '' },
    checkIn: { type: String, default: '' },
    guests: { type: String, default: '' },
    source: { type: String, default: 'hero' },
    userAgent: { type: String, default: '' },
    ip: { type: String, default: '' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Search', searchSchema)
