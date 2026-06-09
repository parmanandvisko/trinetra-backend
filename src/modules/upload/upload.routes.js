const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { protect } = require('../../middleware/auth.middleware')
const { success, error } = require('../../utils/response')

const uploadDir = path.join(process.cwd(), 'uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
    cb(null, name)
  },
})

const fileFilter = (_, file, cb) => {
  if (file.mimetype.startsWith('image/')) return cb(null, true)
  cb(new Error('Only image files are allowed'))
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } })
const mediaFilter = (_, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) return cb(null, true)
  cb(new Error('Only image and video files are allowed'))
}
const mediaUpload = multer({ storage, fileFilter: mediaFilter, limits: { fileSize: 50 * 1024 * 1024 } })

const getBaseUrl = (req) => {
  const forwardedProto = req.get('x-forwarded-proto')?.split(',')[0].trim()
  const protocol = forwardedProto || req.protocol
  return `${protocol}://${req.get('host')}`
}

router.post('/image', protect, upload.single('image'), (req, res) => {
  try {
    if (!req.file) return error(res, 'Image file is required', 400)
    const baseUrl = getBaseUrl(req)
    return success(res, { url: `${baseUrl}/uploads/${req.file.filename}` }, 'Image uploaded', 201)
  } catch (err) {
    return error(res, err.message)
  }
})

router.post('/media', protect, mediaUpload.single('media'), (req, res) => {
  try {
    if (!req.file) return error(res, 'Media file is required', 400)
    const baseUrl = getBaseUrl(req)
    return success(res, {
      url: `${baseUrl}/uploads/${req.file.filename}`,
      mediaType: req.file.mimetype.startsWith('video/') ? 'video' : 'image',
    }, 'Media uploaded', 201)
  } catch (err) {
    return error(res, err.message)
  }
})

module.exports = router
