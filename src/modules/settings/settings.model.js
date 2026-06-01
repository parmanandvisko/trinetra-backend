const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema({
  activeTheme: { type: String, default: 'crimson-gold' },
}, { timestamps: true })

module.exports = mongoose.model('Settings', settingsSchema)
