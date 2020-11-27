const Sequelize = require('sequelize');
const TransaccionModel = require('./models/transaccion')
const UsuarioModel = require('./models/usuarios');

const sequelize = new Sequelize('dz2j0J2vaE', 'dz2j0J2vaE', 't3pfzMNP7q', {
    host: 'remotemysql.com',
    dialect: 'mysql',
});

const Transaccion = TransaccionModel(sequelize, Sequelize);
const Usuario = UsuarioModel(sequelize, Sequelize);
sequelize.sync({ force: false })
    .then(() =>  {
        console.log('Tablas sincronizadas');
    })



module.exports = {
    Transaccion,
    Usuario
}