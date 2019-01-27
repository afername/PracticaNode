'use strict';

const mongoose = require('mongoose');
const db = mongoose.connection;

db.on('error', (err) => {
    console.error('Error de conexión a la BBDD', err);
});
db.once ('open', () => {
    console.info('Conectado a MongoDB en', mongoose.connection.name);
});

mongoose.connect( 'mongodb://localhost/nodepop', { useNewUrlParser: true});

module.exports = db;