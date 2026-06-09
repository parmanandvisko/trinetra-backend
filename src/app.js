const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const errorMiddleware = require('./middleware/error.middleware')

const authRoutes = require('./modules/auth/auth.routes')
const blogRoutes = require('./modules/blog/blog.routes')
const destinationRoutes = require('./modules/destination/destination.routes')
const packageRoutes = require('./modules/package/package.routes')
const contactRoutes = require('./modules/contact/contact.routes')
const bookingRoutes = require('./modules/booking/booking.routes')
const dashboardRoutes = require('./modules/dashboard/dashboard.routes')
const settingsRoutes = require('./modules/settings/settings.routes')
const uploadRoutes = require('./modules/upload/upload.routes')
const searchRoutes = require('./modules/search/search.routes')
const quotationDownloadRoutes = require('./modules/quotation-download/quotation-download.routes')
const galleryRoutes = require('./modules/gallery/gallery.routes')

const app = express()

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))

app.use('/api/auth', authRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/packages', packageRoutes)
app.use('/api/contacts', contactRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/uploads', uploadRoutes)
app.use('/api/searches', searchRoutes)
app.use('/api/quotation-downloads', quotationDownloadRoutes)
app.use('/api/gallery', galleryRoutes)

app.get('/api/health', (_, res) => res.json({ status: 'OK', message: 'Trinetra API is running' }))

app.use(errorMiddleware)

module.exports = app
