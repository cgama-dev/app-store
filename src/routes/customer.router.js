const express = require('express')

const router = express.Router()

const { query, getById, create} = require('./../controllers/customer.controller')

router.get('/', query)
router.get('/:id', getById)
router.post('/', create)

module.exports = router
