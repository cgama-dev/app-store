const CustomerModel = require('./../models/customer.model')

const RepositoryCustomer = () => {

    const Repository = {
        query: () => CustomerModel.find({}),

        getById: (id) => CustomerModel.findById(id),

        create: (data) => {
            const customer = new CustomerModel(data)
            return customer.save()
        }
    }

    return Repository
}

module.exports = RepositoryCustomer