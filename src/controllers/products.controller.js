const ProductModel = require('./../models/product.model')

const query = async (req, res) => {
    try {

        const products = await ProductModel.find({ active: true }, "title price slug")

        return res.status(200).send(products)

    } catch (err) {
        return res.status(400).send({ message: "Erro GET" })
    }
}

const getById = async (req, res) => {
    try {
        const idProduto = req.params.id

        console.log(idProduto)

        const product = await ProductModel.findById(idProduto)

        return res.status(200).send(product)

    } catch (err) {
        return res.status(400).send({ message: 'Erro ao buscar produto' })
    }
}

const getBySlug = async (req, res) => {
    try {
        const slug = req.params.slug

        const product = await ProductModel.findOne({
            slug: slug,
            active: true
        }, "title description price tags slug")

        return res.status(200).send(product)

    } catch (err) {
        return res.status(400).send({ message: 'Erro ao buscar produto' })
    }
}

const getByTags = async (req, res) => {
    try {
        const tag = req.params.tag

        const product = await ProductModel.findOne({
            tags: tag,
            active: true
        })
        return res.status(200).send(product)
    } catch (err) {
        return res.status(400).send({ message: "Erro ao buscar produto" })
    }
}

const create = async (req, res) => {
    try {

        // const product = await ProductModel.create(req.body)

        // return res.status(200).send({ message: "Produto cadastrado com sucesso", data: product })

        const product = new ProductModel(req.body)

        const result = await product.save()

        return res.status(200).send({ message: "Produto cadastrado com sucesso", data: result })

    } catch (err) {
        return res.status(400).send({ message: "Erro ao cadastrar o produto", error: err })
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await ProductModel.findByIdAndUpdate(id, req.body, { new: true })

        return res.status(200).send({ message: "Produto atualizado com sucesso", data: product })

    } catch (err) {
        return res.status(400).send({ message: "Erro ao atualizar produto", error: err })
    }
}

const destroy = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await ProductModel.findByIdAndRemove({ _id: id })

        return res.status(200).send({ message: "Produto deletado com sucesso", produto: product.title })

    } catch (err) {
        return res.status(400).send({ message: "Erro ao Deletar produto", id: id })
    }
}

module.exports = {
    query,
    getById,
    getBySlug,
    getByTags,
    create,
    update,
    destroy
}