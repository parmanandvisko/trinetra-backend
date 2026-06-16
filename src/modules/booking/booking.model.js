const mongoose = require('mongoose')
const BookingCounter = require('./booking-counter.model')

const bookingSchema = new mongoose.Schema(
  {
    bookingRefNo: { type: String, unique: true, sparse: true },
    voucherNo: { type: String, unique: true, sparse: true },
    invoiceNo: { type: String, unique: true, sparse: true },
    invoiceDate: { type: Date },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, default: '' },
    package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
    packageTitle: { type: String },
    destination: { type: String, default: '' },
    travelDate: { type: Date },
    checkInDate: { type: Date },
    checkOutDate: { type: Date },
    adults: { type: Number, default: 2 },
    children: { type: Number, default: 0 },
    numberOfGuests: { type: Number, default: 2 },
    servicesIncluded: {
      hotel: { type: Boolean, default: false },
      flight: { type: Boolean, default: false },
      airportTransfer: { type: Boolean, default: false },
      sightseeing: { type: Boolean, default: false },
      visa: { type: Boolean, default: false },
      insurance: { type: Boolean, default: false },
    },
    totalAmount: { type: Number, default: 0 },
    invoiceDescription: { type: String, default: 'Tour package booking' },
    invoiceAmount: { type: Number, default: 0 },
    notes: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
    paymentStatus: { type: String, enum: ['unpaid', 'partial', 'paid'], default: 'unpaid' },
  },
  { timestamps: true }
)

const numberPattern = /^TGH(?:-V)?-(\d{4})-(\d{4})$/

const extractNumberParts = (booking) => {
  for (const value of [booking.bookingRefNo, booking.invoiceNo, booking.voucherNo]) {
    const match = value?.match(numberPattern)
    if (match) return { year: match[1], number: match[2] }
  }
  return null
}

const getNextBookingNumber = async (Booking) => {
  const year = new Date().getFullYear()

  while (true) {
    const counter = await BookingCounter.findOneAndUpdate(
      { key: `booking-${year}` },
      { $inc: { seq: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
    const number = String(counter.seq).padStart(4, '0')
    const bookingRefNo = `TGH-${year}-${number}`
    const invoiceNo = `TGH-V-${year}-${number}`
    const exists = await Booking.exists({
      $or: [
        { bookingRefNo },
        { voucherNo: invoiceNo },
        { invoiceNo },
      ],
    })

    if (!exists) return { year, number }
  }
}

bookingSchema.pre('validate', async function setBookingNumbers(next) {
  if (this.bookingRefNo && this.voucherNo && this.invoiceNo) return next()

  try {
    const existingParts = extractNumberParts(this)
    const { year, number } = existingParts || await getNextBookingNumber(this.constructor)

    if (!this.bookingRefNo) this.bookingRefNo = `TGH-${year}-${number}`
    if (!this.voucherNo) this.voucherNo = `TGH-V-${year}-${number}`
    if (!this.invoiceNo) this.invoiceNo = `TGH-V-${year}-${number}`
    if (!this.invoiceDate) this.invoiceDate = new Date()
    if (!this.invoiceAmount) this.invoiceAmount = this.totalAmount || 0
    if (!this.numberOfGuests) this.numberOfGuests = Number(this.adults || 0) + Number(this.children || 0)
    next()
  } catch (err) {
    next(err)
  }
})

module.exports = mongoose.model('Booking', bookingSchema)
