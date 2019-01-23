const OrderModel = require('./../models/order.model')

const RepositoryOrder = () => {

    const Repository = {
        query: () => OrderModel
            .find({})
            .populate('customer', "name")
            .populate('items.product', "title"),

        getById: (id) => OrderModel
            .findById(id),

        create: (data) => {
            const Order = new OrderModel(data)
            return Order.save()
        }
    }

    return Repository
}

module.exports = RepositoryOrder