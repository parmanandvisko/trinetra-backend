const Blog = require('../blog/blog.model')
const Destination = require('../destination/destination.model')
const Package = require('../package/package.model')
const Contact = require('../contact/contact.model')
const Booking = require('../booking/booking.model')
const Category = require('../category/category.model')
const Search = require('../search/search.model')
const { success, error } = require('../../utils/response')

const getStats = async (req, res) => {
  try {
    const [blogs, destinations, packages, contacts, bookings, categories, searches, newContacts, pendingBookings, confirmedBookings] = await Promise.all([
      Blog.countDocuments(),
      Destination.countDocuments(),
      Package.countDocuments(),
      Contact.countDocuments(),
      Booking.countDocuments(),
      Category.countDocuments(),
      Search.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ status: 'confirmed' }),
    ])

    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5).populate('package', 'title')
    const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(5)

    return success(res, {
      stats: { blogs, destinations, packages, contacts, bookings, categories, searches, newContacts, pendingBookings, confirmedBookings },
      recentBookings,
      recentContacts,
    })
  } catch (err) { return error(res, err.message) }
}

module.exports = { getStats }
