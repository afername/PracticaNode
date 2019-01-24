'use strict';

const mongoose = require('mongoose');

mongoose.connection.on('error', err =>{
    console.error('Error de conexión a la BBDD', err);
    process.exit(1);
});

mongoose.connection.once('open', () => {
    console.info('Conectado a MongoDB en', mongoose.connection.name);
});

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost/nodepop', { useNewUrlParser: true});

module.exports = mongoose.connection;