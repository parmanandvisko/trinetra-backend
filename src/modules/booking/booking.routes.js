const router = require('express').Router()
const { getAll, create, update, remove } = require('./booking.controller')
const { protect } = require('../../middleware/auth.middleware')

router.get('/', protect, getAll)
router.post('/', create)
router.put('/:id', protect, update)
router.delete('/:id', protect, remove)

module.exports = router
