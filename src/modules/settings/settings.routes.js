const router = require('express').Router()
const { get, update } = require('./settings.controller')
const { protect } = require('../../middleware/auth.middleware')

router.get('/', get)
router.put('/', protect, update)

module.exports = router
