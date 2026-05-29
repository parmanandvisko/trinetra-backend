const router = require('express').Router()
const { getStats } = require('./dashboard.controller')
const { protect } = require('../../middleware/auth.middleware')

router.get('/stats', protect, getStats)

module.exports = router
