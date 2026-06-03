const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema({
  activeTheme: { type: String, default: 'crimson-gold' },

  // Business Info
  businessName: { type: String, default: 'Trinetra Global Holidays' },
  tagline: { type: String, default: 'Explore More, Worry Less.' },
  phone: { type: String, default: '+91 98924 94688' },
  whatsapp: { type: String, default: '919343088141' },
  email: { type: String, default: 'info@trinetraglobalholidays.com' },
  address: { type: String, default: '708, Mohan Nano Estates, Ambernath West, India 421505' },
  logoUrl: { type: String, default: '' },

  // Social Links
  facebook: { type: String, default: '' },
  instagram: { type: String, default: '' },
  twitter: { type: String, default: '' },
  youtube: { type: String, default: '' },

  // Hero Section
  heroTitle: { type: String, default: 'Where Would You Like To Go?' },
  heroSubtitle: { type: String, default: 'One life. Many destinations' },
  heroBg: { type: String, default: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop' },

  // About Us
  aboutTitle: { type: String, default: 'About Trinetra Global Holidays' },
  aboutSubtitle: { type: String, default: 'Your Trusted Travel Partner Since 2009' },
  aboutDescription: { type: String, default: 'Trinetra Global Holidays is a leading travel company based in Ambernath, Maharashtra. With over 15 years of experience, we have helped thousands of travelers explore the world.' },
  aboutImage: { type: String, default: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop' },
  teamMembers: [{ name: String, role: String, img: String }],
  stats: [{ value: String, label: String }],

  // FAQ
  faqs: [{ category: String, question: String, answer: String }],

  // Legal Pages (plain text with \n for sections)
  termsContent: { type: String, default: '' },
  privacyContent: { type: String, default: '' },
  refundContent: { type: String, default: '' },

  // Footer
  copyrightText: { type: String, default: '© 2025 Trinetra Global Holidays. All Rights Reserved.' },
  footerTagline: { type: String, default: 'Designed with ❤️ for Travelers' },
}, { timestamps: true })

module.exports = mongoose.model('Settings', settingsSchema)
