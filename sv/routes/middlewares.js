const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {

    if (!req.headers['token']) {
        return res.json({ error: 'Falta ingresar token' })
    }

    const userToken = req.headers['token'];

    let payload = {};

    try {

        payload = jwt.decode(userToken, 'secret');
    } catch (err) {
        return res.json({ error: 'Token incorrecto' });

    }

    if (payload.expiredAt < moment().unix()) {
        return res.json({ error: 'El token ha expirado' });
    }

    req.usuarioId = payload.usuarioId;

    next();
}

module.exports = {
    checkToken: checkToken
}