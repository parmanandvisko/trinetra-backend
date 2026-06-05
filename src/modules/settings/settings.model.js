const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema({
  activeTheme: { type: String, default: 'crimson-gold' },

  // Business Info
  businessName: { type: String, default: 'Trinetra Global Holidays', maxlength: 45 },
  tagline: { type: String, default: 'Explore More, Worry Less.', maxlength: 80 },
  phone: { type: String, default: '+91 98924 94688', maxlength: 18 },
  phone2: { type: String, default: '', maxlength: 18 },
  phone3: { type: String, default: '', maxlength: 18 },
  whatsapp: { type: String, default: '919892494688', match: /^[0-9]{10,12}$/, maxlength: 12 },
  email: { type: String, default: 'info@trinetraglobalholidays.com', maxlength: 80 },
  address: { type: String, default: '708, Mohan Nano Estates, Ambernath West, India 421505', maxlength: 180 },
  logoUrl: { type: String, default: '', maxlength: 250 },
  gstNumber: { type: String, default: '', maxlength: 80 },
  businessRegistration: { type: String, default: '', maxlength: 80 },
  googleReviews: { type: String, default: '', maxlength: 40 },
  happyTravelers: { type: String, default: '50+', maxlength: 20 },
  securePaymentBadge: { type: String, default: 'Secure Payments', maxlength: 40 },
  customerPhotos: [{ type: String, maxlength: 250 }],
  customerTestimonials: [{
    name: { type: String, maxlength: 45 },
    location: { type: String, maxlength: 60 },
    text: { type: String, maxlength: 220 },
    img: { type: String, maxlength: 250 },
  }],

  // Social Links
  facebook: { type: String, default: '', maxlength: 250 },
  instagram: { type: String, default: '', maxlength: 250 },
  linkedin: { type: String, default: '', maxlength: 250 },
  twitter: { type: String, default: '', maxlength: 250 },
  youtube: { type: String, default: '', maxlength: 250 },

  // Hero Section
  heroTitle: { type: String, default: 'Where Would You Like To Go?', maxlength: 65 },
  heroSubtitle: { type: String, default: 'One life. Many destinations', maxlength: 45 },
  heroBg: { type: String, default: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop', maxlength: 250 },

  // About Us
  aboutTitle: { type: String, default: 'About Trinetra Global Holidays', maxlength: 65 },
  aboutSubtitle: { type: String, default: 'Your Trusted Travel Partner Since 2009', maxlength: 80 },
  aboutDescription: { type: String, default: 'Trinetra Global Holidays is a leading travel company based in Ambernath, Maharashtra. With over 15 years of experience, we have helped thousands of travelers explore the world.', maxlength: 1200 },
  aboutImage: { type: String, default: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop', maxlength: 250 },
  teamMembers: [{
    name: { type: String, maxlength: 45 },
    role: { type: String, maxlength: 55 },
    img: { type: String, maxlength: 250 },
  }],
  stats: [{
    value: { type: String, maxlength: 8 },
    label: { type: String, maxlength: 26 },
  }],

  // FAQ
  faqs: [{
    category: { type: String, maxlength: 45 },
    question: { type: String, maxlength: 140 },
    answer: { type: String, maxlength: 800 },
  }],

  // Legal Pages
  termsContent: { type: String, default: '', maxlength: 8000 },
  privacyContent: { type: String, default: '', maxlength: 8000 },
  refundContent: { type: String, default: '', maxlength: 8000 },
  paymentDetails: { type: String, default: '', maxlength: 3000 },

  // Footer
  copyrightText: { type: String, default: 'Copyright 2025 Trinetra Global Holidays. All Rights Reserved.', maxlength: 90 },
  footerTagline: { type: String, default: 'Designed Trinetra Global Holidays', maxlength: 70 },
}, { timestamps: true })

module.exports = mongoose.model('Settings', settingsSchema)
