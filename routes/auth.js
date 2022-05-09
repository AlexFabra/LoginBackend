const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renew } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jvt');

const router = Router();

//Crear un nuevo usuario
//Controlador de la ruta new:
//el router espera path, middlewares(opcional y de ejecución secuencial) y controlador
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
    validarCampos
], crearUsuario)

//login 
router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],login)
//validar y revalidar token
router.get('/renew',validarJWT,renew)

module.exports = router;