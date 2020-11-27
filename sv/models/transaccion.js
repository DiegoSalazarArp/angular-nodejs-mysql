module.exports = (sequelize, type) => {
    return sequelize.define('transaccion', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rut_suscriptor: type.STRING,
        producto: type.STRING,
        precio: type.INTEGER,
        comision: type.INTEGER,

    })
}