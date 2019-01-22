const express = require('express')

const router = express.Router()

const { query, getById, getBySlug,getByTags, create, update, destroy } = require('./../controllers/products.controller')

router.get('/', query)
router.get('/:id', getById)
router.get('/slug/:slug', getBySlug)
router.get('/tags/:tag', getByTags)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router
