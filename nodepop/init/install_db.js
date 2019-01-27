'use strict';

/**
 * Creo datos iniciales de la BBDD
 */


const db = require('../lib/connectMongoose');
const Anuncio = require('../models/Anuncio');

db.once('open', async () => {
    try {
        // Obtener el JSON de anuncios
        const data = require('../data/anuncios.json');
        
        // Eliminar todos los documentos
        await Anuncio.deleteMany({}).catch(err => {
            throw new Error(err);
        });
        console.info('Datos de la BD borrados.');

        // Insert documents from JSON
        await Anuncio.insertMany(data).catch(err => {
            throw new Error(err);
        });
        console.info('Datos insertados a la BD.');

        db.close();
        console.info('Conexión a BD cerrada.');
    } catch(err) {
        console.error('Se ha producido un error en la ejecución del script', err);
        
        db.close();
        console.info('Conexión a BD cerrada.');
    }
});