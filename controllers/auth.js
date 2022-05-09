const bcrypt = require('bcryptjs/dist/bcrypt');
const { response } = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { name, email, password } = req.body;

    //verificar el email:

    //hash password:

    //generar jwt 

    //generar respuesta exitosa

    try {

        const usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

        const dbUser = new Usuario(req.body);

        //obtenemos numeros aleatorios
        const salt = bcrypt.genSaltSync();
        //encriptamos con hash la contraseña del usuario
        dbUser.password = bcrypt.hashSync(password, salt);
        //generar jwt:
        const token = await generarJWT(dbUser.id, name);

        await dbUser.save();

        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        });



    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: 'error: hable con el administrador'
        })
    }
}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        //comprovar si existe el user:
        const dbUser = await Usuario.findOne({ email });
        if (!dbUser) {
            console.log('no existe el usuario');
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }
        //Confirmar si el pwd hace match
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if (!validPassword) {
            console.log('contraseña incorrecta');
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }
        //generar jwt:
        const token = await generarJWT(dbUser.id, dbUser.name);
        //respuesta:
        return res.status(200).json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        })

    } catch {
        console.log(error)
        return res.json({
            ok: true,
            mensaje: 'error en login'
        })
    }

}

const renew = async (req, res) => {

    const { uid, name } = req;

    //generar jwt:
    const newToken = await generarJWT(uid, name);

    return res.json({
        ok: true,
        mensaje: 'renovar usuario /renew',
        uid,
        name,
        newToken
    })
}

module.exports = {
    crearUsuario,
    login,
    renew
}
