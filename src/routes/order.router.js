const express = require('express')

const router = express.Router()

const { query, getById, create } = require('./../controllers/order.controller')

const AuthService = require('./../services/auth.service')

router.get('/', query)
router.get('/:id', getById)
router.post('/', AuthService.authorize, create)

module.exports = router
