const CustomerModel = require('./../models/customer.model')

const ValidationContract = require('../validators/fluent-validator')

const RepositoryCustomer = require('./../repositories/customer.repository')()

const ServiceEmail = require('./../services/email.service')()

const AuthService = require('./../services/auth.service')

const md5 = require('md5')

const query = async (req, res) => {
    try {

        const customers = await RepositoryCustomer.query()

        return res.status(200).send(customers)

    } catch (err) {
        return res.status(400).send({ message: "Erro ao buscar clientes" })
    }
}

const getById = async (req, res) => {
    try {
        const idCustomer = req.params.id

        const customer = await RepositoryCustomer.getById(idCustomer)

        return res.status(200).send(customer)

    } catch (err) {
        return res.status(400).send({ message: 'Erro ao buscar clientes' })
    }
}

const create = async (req, res) => {
    try {

        let contract = new ValidationContract();

        contract.hasMinLen(req.body.name, 3, 'O título deve conter pelo menos 3 caracteres');
        contract.isEmail(req.body.email, 'O informado é invalido');
        contract.hasMinLen(req.body.password, 6, 'A senha informada deve conter pelo menos 6 caracteres');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).end();
            return;
        }

        const customer = await RepositoryCustomer.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ['user']
        })

        if (customer) {
            ServiceEmail.send(customer.email, "Bem Vindo ao Node Store", global.EMAIL_TMPL.replace('{0}', customer.name))
        }

        return res.status(200).send({ message: "Cliente cadastrado com sucesso", data: customer })

    } catch (err) {
        return res.status(400).send({ message: "Erro ao cadastrar o cliente", error: err })
    }
}

const authenticate = async (req, res) => {
    try {

        const customer = await RepositoryCustomer.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })

        if (!customer) {
            return res.status(404).send({ message: "Usuário ou senha inválido" })
        }

        const { id, email, name, roles } = customer

        const token = await AuthService.generateToken({ id, email, name, roles })

        return res.status(200).send({ message: "Usuário Logado com Sucesso", token: token, data: { email, name } })

    } catch (err) {
        return res.status(400).send({ message: "Erro ao realizar autenticação", error: err })
    }
}

const refreshToken = async (req, res) => {
    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        const data = await AuthService.decodeToken(token)


        const customer = await RepositoryCustomer.getById(data.id)

        if (!customer) {
            return res.status(404).send({ message: "Usuário ou senha inválido" })
        }

        const { id, email, name, roles } = customer

        const newToken = await AuthService.generateToken({ id, email, name, roles })

        return res.status(200).send({ message: "Usuário Logado com Sucesso", token: newToken, data: { email, name } })

    } catch (err) {
        return res.status(400).send({ message: "Erro ao realizar autenticação", error: err })
    }
}

module.exports = {
    query,
    getById,
    create,
    authenticate,
    refreshToken
}