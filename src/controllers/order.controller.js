const OrderModel = require('./../models/order.model')

const ValidationContract = require('../validators/fluent-validator')

const RepositoryOrder = require('./../repositories/order.repository')()

const AuthService = require('./../services/auth.service')

const guid = require('guid')

const query = async (req, res) => {
    try {

        const orders = await RepositoryOrder.query()

        return res.status(200).send(orders)

    } catch (err) {
        return res.status(400).send({ message: "Erro ao buscar pedidos" })
    }
}

const getById = async (req, res) => {
    try {
        const idOrder = req.params.id

        const order = await RepositoryOrder.getById(idOrder)

        return res.status(200).send(order)

    } catch (err) {
        return res.status(400).send({ message: 'Erro ao buscar pedidos' })
    }
}

const create = async (req, res) => {
    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        const data = await AuthService.decodeToken(token)

        const order = await RepositoryOrder.create({
            customer: data.id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        })

        return res.status(200).send({ message: "Pedido cadastrado com sucesso", data: order })

    } catch (err) {
        return res.status(400).send({ message: "Erro ao cadastrar o pedido", error: err })
    }
}

module.exports = {
    query,
    getById,
    create
}