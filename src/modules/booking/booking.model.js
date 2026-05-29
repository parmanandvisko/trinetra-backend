const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
    packageTitle: { type: String },
    travelDate: { type: Date },
    adults: { type: Number, default: 2 },
    children: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    notes: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
    paymentStatus: { type: String, enum: ['unpaid', 'partial', 'paid'], default: 'unpaid' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Booking', bookingSchema)
