'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;

conn.on( 'error', (err) => {
    console.error('Error de conexión a la BBDD', err);
    process.exit(1);
});

conn.once ('open', () => {
    console.info('Conectado a MongoDB en', mongoose.connection.name);
});


mongoose.connect('mongodb://localhost/nodepop', { useNewUrlParser: true});

module.exports = conn;