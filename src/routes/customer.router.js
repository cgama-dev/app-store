const express = require('express')

const router = express.Router()

const { query, getById, create, authenticate, refreshToken } = require('./../controllers/customer.controller')

const AuthService = require('./../services/auth.service')

router.get('/', AuthService.authorize, query)
router.get('/:id', getById)
router.post('/', create)
router.post('/authenticate', authenticate)
router.post('/refresh-token', AuthService.authorize, refreshToken)

module.exports = router
