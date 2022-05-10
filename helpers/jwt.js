const jwt = require("jsonwebtoken")

const generarJWT = (uid, name) => {
    const payload = { uid, name}

    return new Promise((resolve, reject) => {

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (error, token) => {
            if (error) {
                console.log("no se pudo generar el token");
                reject(error);
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generarJWT
}