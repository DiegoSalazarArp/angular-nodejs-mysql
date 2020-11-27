const router = require('express').Router();

const { Transaccion } = require('../../db')

//Devuelve todos las transacciones
router.get('/', async(req, res) => {
    const transaccion = await Transaccion.findAll();
    res.json(transaccion);

});

//Devuelve transaccion por id
router.get('/:id', async(req, res) => {
    const transaccion = await Transaccion.findOne({ where: { id: req.params.id } });
    res.json(transaccion);

});

//Crear nueva transaccion
router.post('/add', async(req, res) => {
    const transaccion = await Transaccion.create(req.body);
    res.json(transaccion);

})


//Actualizar transaccion
router.put('/:id', async(req, res) => {

    await Transaccion.update(req.body, {
        where: { id: req.params.id }
    });

    res.json({
        success: 'Modificación completa',

    });
});

//Borrar transaccion
router.delete('/:id', async(req, res) => {

    await Transaccion.destroy({
        where: { id: req.params.id },
    });

    res.json({
        success: 'Eliminación completa',
    })


})


module.exports = router;