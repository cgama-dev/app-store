const express = require('express')
const bodyParser = require('body-parser')
const debug = require('debug')('app-stoker-api:server')
const morgan = require('morgan')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./documentation/swagger.json')

const app = express()

//Config Database
const mongoose = require('./db')

// Router loading
const indexRouter = require('./routes/index.router')
const productRouter = require('./routes/product.router')
const customerRouter = require('./routes/customer.router')
const orderRouter = require('./routes/order.router')

// Midlewares
app.use(bodyParser.json({
    limit: '5mb'
}))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(morgan('dev'))
app.use(cors())

// Routes
app.use('/', indexRouter)
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)

// const options = {
//     explorer: true,
//     securityDefinitions: {
      
//         JWT: {
//           name: 'JWT',
//           schema: {
//             type: 'apiKey',
//             in: 'header',
//             name: 'Authorization',
//             description: ''
//           },
//           value: 'Bearer <my own JWT token>'
//         }
      
//     }
//   }
// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app