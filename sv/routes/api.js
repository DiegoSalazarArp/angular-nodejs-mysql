const router = require('express').Router();

const apiTransaccionRouter = require('./api/transaccion');
const apiUsuariosRouter = require('./api/usuario');
const middleware = require('./middlewares')


router.use('/trans', apiTransaccionRouter);
router.use('/users', apiUsuariosRouter);


module.exports = router;