const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next) => {
    //validamos los middlewares de express-validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //400: bad request
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    next();
}

module.exports = { validarCampos }