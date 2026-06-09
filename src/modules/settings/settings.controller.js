const Settings = require('./settings.model')
const { success, error } = require('../../utils/response')

const DEFAULT_TERMS_CONTENT = `## 1. Company Information
Trinetra Global Holidays is a registered travel company based in Ambernath West, Maharashtra, India - 421505. Contact: info@trinetraglobalholidays.com | +91 98924 94688

## 2. Booking & Confirmation
All bookings are subject to availability and confirmed only upon receipt of minimum 25% advance payment. Confirmation is sent via WhatsApp and email within 24 hours.

## 3. Pricing & Payment
All prices are quoted in INR. GST and applicable taxes are charged as per government regulations. Full payment must be completed at least 7 days before departure.

## 4. Cancellation Policy
- 30+ days before departure: 10%
- 15-29 days before departure: 25%
- 7-14 days before departure: 50%
- Less than 7 days / No Show: 100% (No refund)

## 5. Liability Limitations
Trinetra Global Holidays acts as an agent for hotels, airlines, and transport providers. We are not liable for injury, loss, delay, or damage caused by third-party service providers.

## 6. Governing Law
These Terms are governed by the laws of India. Disputes are subject to jurisdiction of courts in Ambernath, Maharashtra.`

const DEFAULT_PRIVACY_CONTENT = `## 1. Information We Collect
We collect personal details, contact information, travel documents when required, payment information, and website data such as IP address and cookies.

## 2. How We Use Your Information
- Processing and confirming tour bookings
- Communicating travel arrangements and updates
- Processing refunds and cancellation requests
- Visa applications and hotel/airline reservations
- Sending promotional offers with your consent
- Legal and regulatory compliance

## 3. Information Sharing
We do not sell or trade your personal information. We share only with service providers such as hotels, airlines, visa agencies, and when required by law.

## 4. Data Security
We implement appropriate security measures to protect your data. WhatsApp communications are end-to-end encrypted.

## 5. Your Rights
- Access: Request a copy of your data
- Correction: Request correction of inaccurate data
- Deletion: Request deletion, subject to legal requirements
- Opt-out: Unsubscribe from marketing at any time

## 6. Contact
For privacy queries: info@trinetraglobalholidays.com | +91 98924 94688`

const DEFAULT_REFUND_CONTENT = `## Cancellation Charges
| Period | Domestic | International |
| 30+ days before departure | 10% | 15% |
| 15-29 days before departure | 25% | 30% |
| 7-14 days before departure | 50% | 60% |
| Less than 7 days / No Show | 100% | 100% |

## Refund Process
Refunds are processed within 5-7 business days of receiving the cancellation request. Bank transfers may take 3-5 additional working days. UPI refunds may take 1-3 business days.

## Non-Refundable Components
- Visa application fees
- Travel insurance premiums
- Non-refundable airline tickets
- Non-refundable hotel bookings
- Adventure activity bookings

## How to Cancel
Send an email to info@trinetraglobalholidays.com with your booking reference number, or WhatsApp us at +91 98924 94688. Our team will confirm receipt within 24 hours.

## Cancellation by Company
In rare cases such as force majeure or insufficient group size, we will offer alternative dates or a full refund within 10 business days.`

const DEFAULT_SETTINGS = {
  activeTheme: 'crimson-gold',
  businessName: 'Trinetra Global Holidays',
  tagline: 'Explore More, Worry Less.',
  phone: '+91 98924 94688',
  phone2: '',
  phone3: '',
  whatsapp: '919892494688',
  email: 'info@trinetraglobalholidays.com',
  address: '708, Mohan Nano Estates, Ambernath West, India 421505',
  logoUrl: '',
  gstNumber: 'GST Number: Available on Request',
  businessRegistration: 'Registered Travel Business',
  googleReviews: '4.8/5 Google Reviews',
  happyTravelers: '50+',
  securePaymentBadge: 'Secure Payments',
  customerPhotos: [],
  customerTestimonials: [],
  facebook: '',
  instagram: '',
  linkedin: '',
  twitter: '',
  youtube: '',
  heroTitle: 'Where Would You Like To Go?',
  heroSubtitle: 'One life. Many destinations',
  heroBg: '',
  aboutTitle: 'About Trinetra Global Holidays',
  aboutSubtitle: 'Your Trusted Travel Partner Since 2009',
  aboutDescription: 'Trinetra Global Holidays is a leading travel company based in Ambernath, Maharashtra. With over 15 years of experience, we have helped thousands of travelers explore the world.',
  aboutImage: '',
  teamMembers: [],
  stats: [{ value: '15+', label: 'Years Experience' }, { value: '5000+', label: 'Happy Travelers' }, { value: '200+', label: 'Destinations' }, { value: '100%', label: 'Satisfaction' }],
  faqs: [],
  termsContent: DEFAULT_TERMS_CONTENT,
  privacyContent: DEFAULT_PRIVACY_CONTENT,
  refundContent: DEFAULT_REFUND_CONTENT,
  paymentDetails: '',
  copyrightText: 'Copyright 2025 Trinetra Global Holidays. All Rights Reserved.',
  footerTagline: 'Designed Trinetra Global Holidays',
}

const normalizeSettings = (settings = {}) => {
  return {
    ...settings,
    whatsapp: ['9343088141', '919343088141'].includes(settings.whatsapp) ? '919892494688' : settings.whatsapp,
    termsContent: settings.termsContent?.trim() ? settings.termsContent : DEFAULT_TERMS_CONTENT,
    privacyContent: settings.privacyContent?.trim() ? settings.privacyContent : DEFAULT_PRIVACY_CONTENT,
    refundContent: settings.refundContent?.trim() ? settings.refundContent : DEFAULT_REFUND_CONTENT,
  }
}

const cleanPayload = (body) => {
  const { _id, __v, createdAt, updatedAt, ...payload } = body
  return normalizeSettings(payload)
}

const get = async (req, res) => {
  try {
    let settings = await Settings.findOne().lean()
    if (!settings) settings = await Settings.create({})
    settings = settings.toObject ? settings.toObject() : settings
    return success(res, normalizeSettings({ ...DEFAULT_SETTINGS, ...settings }))
  } catch (err) { return error(res, err.message) }
}

const update = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: cleanPayload(req.body) },
      { new: true, upsert: true, runValidators: true }
    ).lean()
    return success(res, normalizeSettings({ ...DEFAULT_SETTINGS, ...settings }), 'Settings updated successfully')
  } catch (err) { return error(res, err.message) }
}

module.exports = { get, update }
