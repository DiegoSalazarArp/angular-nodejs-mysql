module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rut: type.STRING,
        razon_social: type.STRING,
        email: type.STRING,
        telefono: type.STRING,
        url_log: type.STRING,
        password: type.STRING(150)


    });
}