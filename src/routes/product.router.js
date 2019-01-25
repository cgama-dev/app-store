const express = require('express')

const router = express.Router()

const { query, getById, getBySlug, getByTags, create, update, destroy } = require('./../controllers/products.controller')

const AuthService = require('./../services/auth.service')

router.get('/', query)
router.get('/:id', getById)
router.get('/slug/:slug', getBySlug)
router.get('/tags/:tag', getByTags)
router.post('/', AuthService.isAdmin, create)
router.put('/:id', AuthService.isAdmin, update)
router.delete('/:id', AuthService.isAdmin, destroy)

module.exports = router
