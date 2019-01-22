const mongoose = require('mongoose')

// Conecting db
 mongoose.connect('mongodb://productsuser:products123@ds127730.mlab.com:27730/products', {
    // useCreateIndex: true,
    useNewUrlParser: true
})

const db  = mongoose.connection

db.on('error', console.error.bind(console, 'Erro ao conectar com o banco'))

db.once('open', ()=> console.log(`Conexão com banco estabelecida` + '::' + new Date()))

module.exports = mongoose
