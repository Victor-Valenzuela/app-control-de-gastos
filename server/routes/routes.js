const { Router } = require('express');
const { verification, register, login, getName, getByMonth, getByCategory, getByDate, postNewSpend, deleteById, getSpendById, updateById, logOut, getUser, updateAccount, deleteAccount, recoverPassword } = require('../controllers/controllers');
const router = Router();

//ruta donde se comprueba si el usuario esta logueado
router.get('/comprobar', verification);

//ruta donde se registra un nuevo usuario
router.post('/registro', register);

//ruta donde se loguea un usuario
router.post('/login', login);

//ruta para borrar cookies
router.get('/logout', logOut);

//ruta inicio, formulario gasto
router.get('/all', getByMonth);

//ruta para obtener gastos por categoria
router.get('/all/categorias', getByCategory);

//ruta para obtener nombre de usuario
router.get('/nombre', getName);


//ruta para obtener gastos por fechas
router.get('/all/fechas', getByDate)

//ruta post para nuevo gasto
router.post('/newgasto', postNewSpend);

///ruta para obtener datos por un id
router.get('/get/:id', getSpendById);
router.put('/put/:id', updateById);

router.delete('/delete/:id', deleteById);
router.delete('/deleteAccount/:email', deleteAccount);

//ruta para obtener un usuario por id y luego actualizarlo
router.get('/user/:id', getUser);
router.put('/user/:id', updateAccount);

//ruta para recuperar contraseña
router.post('/recover', recoverPassword);

module.exports = router;