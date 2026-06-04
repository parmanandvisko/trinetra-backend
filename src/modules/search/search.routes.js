const router = require('express').Router()
const { getAll, create, remove } = require('./search.controller')
const { protect } = require('../../middleware/auth.middleware')

router.get('/', protect, getAll)
router.post('/', create)
router.delete('/:id', protect, remove)

module.exports = router
