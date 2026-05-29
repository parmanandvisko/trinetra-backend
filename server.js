const dotenv = require('dotenv')
dotenv.config()

const app = require('./src/app')
const connectDB = require('./src/config/db')

const PORT = process.env.PORT || 5000


async function startServer() {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`✅ Server running on PORT ${PORT}`)
      console.log(`📦 Environment: ${process.env.NODE_ENV}`)
    })
  } catch (error) {
    console.error('❌ Server failed to start:', error)
    process.exit(1)
  }
}

startServer()
