const ProductModel = require('./../models/product.model')

const RepositoryProduct = () => {

    const Repository = {
        query: () => ProductModel.find({ active: true }, "title price slug"),

        getById: (id) => ProductModel.findById(id),

        getBySlug: (slug) => ProductModel.findOne({ slug: slug, active: true }, "title description price tags slug"),

        getByTags: (tag) => ProductModel.findOne({ tags: tag, active: true }, "title description price tags slug"),

        create: (data) => {
            const product = new ProductModel(data)
            return product.save()
        },

        update: (id, data) => ProductModel.findByIdAndUpdate(id, data, { new: true }),

        destroy: (id) => ProductModel.findByIdAndRemove({ _id: id })

    }

    return Repository
}

module.exports = RepositoryProduct