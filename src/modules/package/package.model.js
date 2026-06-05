const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    images: [{ type: String }],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    itinerary: [{ day: Number, title: String, description: String }],
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    maxGroupSize: { type: Number, default: 15 },
    isFeature: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    type: { type: String, enum: ['domestic', 'international'], default: 'international' },
    tag: { type: String, default: '' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Package', packageSchema)
