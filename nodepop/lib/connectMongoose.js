'use strict';

const mongoose = require('mongoose');

mongoose.connection.on('error', err =>{
    console.log('Error de conexión a la BBDD', err);
    process.exit(1);
});

mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB en', mongoose.connection.name);
});

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost/cursonode', { useNewUrlParser: true});

module.exports = mongoose.connection;