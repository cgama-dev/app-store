const ProductModel = require('./../models/product.model')

const ValidationContract = require('../validators/fluent-validator')

const RepositoryProduct = require('./../repositories/product.repository')()

const query = async (req, res) => {
    try {

        const products = await RepositoryProduct.query()

        return res.status(200).send(products)

    } catch (err) {
        return res.status(400).send({ message: "Erro GET" })
    }
}

const getById = async (req, res) => {
    try {
        const idProduto = req.params.id

        const product = await RepositoryProduct.getById(idProduto)

        return res.status(200).send(product)

    } catch (err) {
        return res.status(400).send({ message: 'Erro ao buscar produto' })
    }
}

const getBySlug = async (req, res) => {
    try {
        const slug = req.params.slug

        const product = await RepositoryProduct.getBySlug(slug)

        return res.status(200).send(product)

    } catch (err) {
        return res.status(400).send({ message: 'Erro ao buscar produto' })
    }
}

const getByTags = async (req, res) => {
    try {
        const tag = req.params.tag

        const product = await RepositoryProduct.getByTags(tag)

        return res.status(200).send(product)
    } catch (err) {
        return res.status(400).send({ message: "Erro ao buscar produto" })
    }
}

const create = async (req, res) => {
    try {

        let contract = new ValidationContract();

        contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
        contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
        contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).end();
            return;
        }

        const product = await RepositoryProduct.create(req.body)

        return res.status(200).send({ message: "Produto cadastrado com sucesso", data: product })

    } catch (err) {
        return res.status(400).send({ message: "Erro ao cadastrar o produto", error: err })
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await RepositoryProduct.update(id, req.body)

        return res.status(200).send({ message: "Produto atualizado com sucesso", data: product })

    } catch (err) {
        return res.status(400).send({ message: "Erro ao atualizar produto", error: err })
    }
}

const destroy = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await RepositoryProduct.destroy(id)

        return res.status(200).send({ message: "Produto deletado com sucesso", data: product.title })

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