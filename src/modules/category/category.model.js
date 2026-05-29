const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, lowercase: true, unique: true },
    description: { type: String, default: '' },
    type: { type: String, enum: ['blog', 'package', 'destination', 'general'], default: 'general' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

categorySchema.pre('save', function (next) {
  if (this.isModified('name'))
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  next()
})

module.exports = mongoose.model('Category', categorySchema)
