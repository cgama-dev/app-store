const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const CustomerModel = mongoose.model('Customer', CustomerSchema)

module.exports = CustomerModel