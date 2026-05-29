const router = require('express').Router()
const { getAll, create, updateStatus, remove } = require('./contact.controller')
const { protect } = require('../../middleware/auth.middleware')

router.get('/', protect, getAll)
router.post('/', create)
router.put('/:id', protect, updateStatus)
router.delete('/:id', protect, remove)

module.exports = router
