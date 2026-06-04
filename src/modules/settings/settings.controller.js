const Settings = require('./settings.model')
const { success, error } = require('../../utils/response')

const DEFAULT_SETTINGS = {
  activeTheme: 'crimson-gold',
  businessName: 'Trinetra Global Holidays',
  tagline: 'Explore More, Worry Less.',
  phone: '+91 98924 94688',
  whatsapp: '919343088141',
  email: 'info@trinetraglobalholidays.com',
  address: '708, Mohan Nano Estates, Ambernath West, India 421505',
  logoUrl: '',
  gstNumber: 'GST Number: Available on Request',
  businessRegistration: 'Registered Travel Business',
  googleReviews: '4.8/5 Google Reviews',
  happyTravelers: '50+',
  securePaymentBadge: 'Secure Payments',
  customerPhotos: [
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=120&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=120&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=120&auto=format&fit=crop',
  ],
  customerTestimonials: [
    { name: 'Andre Patil', location: 'Mumbai', text: 'A smooth, honest and well-planned holiday experience from start to finish.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop' },
  ],
  facebook: '',
  instagram: '',
  linkedin: '',
  twitter: '',
  youtube: '',
  heroTitle: 'Where Would You Like To Go?',
  heroSubtitle: 'One life. Many destinations',
  heroBg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop',
  aboutTitle: 'About Trinetra Global Holidays',
  aboutSubtitle: 'Your Trusted Travel Partner Since 2009',
  aboutDescription: 'Trinetra Global Holidays is a leading travel company based in Ambernath, Maharashtra. With over 15 years of experience, we have helped thousands of travelers explore the world.',
  aboutImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop',
  teamMembers: [],
  stats: [{ value: '15+', label: 'Years Experience' }, { value: '5000+', label: 'Happy Travelers' }, { value: '200+', label: 'Destinations' }, { value: '100%', label: 'Satisfaction' }],
  faqs: [],
  termsContent: '',
  privacyContent: '',
  refundContent: '',
  copyrightText: 'Copyright 2025 Trinetra Global Holidays. All Rights Reserved.',
  footerTagline: 'Designed Trinetra Global Holidays',
}

const cleanPayload = (body) => {
  const { _id, __v, createdAt, updatedAt, ...payload } = body
  return payload
}

const get = async (req, res) => {
  try {
    let settings = await Settings.findOne().lean()
    if (!settings) settings = await Settings.create({})
    settings = settings.toObject ? settings.toObject() : settings
    return success(res, { ...DEFAULT_SETTINGS, ...settings })
  } catch (err) { return error(res, err.message) }
}

const update = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: cleanPayload(req.body) },
      { new: true, upsert: true, runValidators: false }
    ).lean()
    return success(res, { ...DEFAULT_SETTINGS, ...settings }, 'Settings updated successfully')
  } catch (err) { return error(res, err.message) }
}

module.exports = { get, update }
