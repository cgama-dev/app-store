const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    items: [{
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]
})

const OrderModel = mongoose.model('Order', OrderSchema)


module.exports = OrderModel