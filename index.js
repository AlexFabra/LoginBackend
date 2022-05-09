//Para ejecutar desde terminal: 'node index.js' o 'npm start'
//Para ejecutar con live-reload (como webpack): 'nodemon index.js': requisitos: 'npm install -g nodemon' 
//en los scripts del package.json lo hemos modificado para ejecutarlo mediante npm run dev 

//Para configurar el backend en node: 
//npm i 
//bcryptjs (para encriptar contraseñas) 
//cors (para aceptar peticiones que vengan de otros dominios) 
//dotenv (para crear variables de entorno)
//express (framework)
//express-validator (validar campos)
//jsonwebtoken (para generar tokens)
//mongoose (orm para interactuar con mongo de manera sencilla)

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();


//Crear el servidor de express:
const app = express();

//conexión a bdd
dbConnection();

//directorio público:
app.use(express.static('public'));

//CORS viene poor defecto configurado.
app.use(cors());

//lectura y parseo del body (de express):
app.use(express.json());

//middleware rutas de express: función que se ejecuta cuando el interprete la lee
//cuando se reciba un endpoint api/auth se reenviará a routes/auth
app.use('/api/auth', require('./routes/auth'));


//le asignamos el puerto:
app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
})

console.log("hola de nuevo");
