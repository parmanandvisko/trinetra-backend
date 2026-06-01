const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const errorMiddleware = require('./middleware/error.middleware')

const authRoutes = require('./modules/auth/auth.routes')
const blogRoutes = require('./modules/blog/blog.routes')
const destinationRoutes = require('./modules/destination/destination.routes')
const packageRoutes = require('./modules/package/package.routes')
const categoryRoutes = require('./modules/category/category.routes')
const contactRoutes = require('./modules/contact/contact.routes')
const bookingRoutes = require('./modules/booking/booking.routes')
const dashboardRoutes = require('./modules/dashboard/dashboard.routes')
const settingsRoutes = require('./modules/settings/settings.routes')

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
app.use('/api/categories', categoryRoutes)
app.use('/api/contacts', contactRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/settings', settingsRoutes)

app.get('/api/health', (_, res) => res.json({ status: 'OK', message: 'Trinetra API is running' }))

app.use(errorMiddleware)

module.exports = app
