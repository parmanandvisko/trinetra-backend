const mongoose = require('mongoose')

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    category: { type: String, enum: ['domestic', 'international'], default: 'international' },
    isFeature: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    tourCount: { type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Destination', destinationSchema)
