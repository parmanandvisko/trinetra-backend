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

const app = express()

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'], credentials: true }))
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

app.get('/api/health', (_, res) => res.json({ status: 'OK', message: 'Trinetra API is running' }))

app.use(errorMiddleware)

module.exports = app
