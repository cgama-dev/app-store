const express = require('express')

const bodyParser = require('body-parser')

const debug = require('debug')('app-stoker-api:server')

const morgan = require('morgan')

const cors = require('cors')

const app = express()


const mongoose = require('./db')

// Router loading
const indexRouter = require('./routes/index.router')
const productRouter = require('./routes/product.router')
const customerRouter = require('./routes/customer.router')
const orderRouter = require('./routes/order.router')

// Midlewares
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())

app.use('/', indexRouter)
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)


module.exports = app