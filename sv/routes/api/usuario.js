const bcrypt = require('bcryptjs');
const router = require('express').Router();
const { Usuario } = require('../../db');
const { check, validationResult } = require('express-validator');
const jwt = require('jwt-simple');
const moment = require('moment');
const { Transaccion } = require('../../db')


let idToken;

router.get('/', async(req, res) => {
    const usuarios = await Usuario.findAll();
    console.log(usuarios);
    res.json(usuarios);

});


router.get('/:id', async(req, res) => {
    const usuario = await Usuario.findOne({ where: { id: req.params.id } });
    res.json(usuario);

});

router.get('/transacciones/:rut', async(req, res) => {
    const transacciones = await Transaccion.findAll({ where: { rut_suscriptor: req.params.rut } });
    res.json(transacciones);

});



router.post('/register', [
    check('rut', 'El rut es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty()

], async(req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errores: errors.array()
        })
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const usuario = await Usuario.create(req.body);
    res.json({ token: createToken(usuario) });


});


router.post('/login', async(req, res) => {

    const usuario = await Usuario.findOne({ where: { rut: req.body.rut } })

    if (usuario) {
        const comparar = bcrypt.compareSync(req.body.password, usuario.password)
        if (comparar) {
            debugger;
            idToken = usuario.id


            res.json({ token: createToken(usuario), usuarioId: usuario.id })
        } else {
            res.json({ error: 'Error en usuario y/o contraseña' })

        }


    } else {
        res.json({ error: 'Error en usuario y/o contraseña' })
    }

});

router.get('/endpoint', (req, res) => {

    console.log(idToken);
    res.json({ idToken: idToken })
})


const createToken = (user) => {

    const payload = {
        usuarioId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(100000, 'minutes').unix()
    }

    return jwt.encode(payload, 'secret');

};


module.exports = router;