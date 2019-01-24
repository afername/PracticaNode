'use strict';

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator/check');

const Ad = require( '../../models/Anuncio' );

/**
 * carga los anuncios paginados
 */
router.get('/', async (req, res, next) => {
    try {
        // Definición variables
        const name = req.query.name;
        const venta = req.query.venta;
        const precio = req.query.precio;
        const foto = req.query.foto;
        const tags = req.query.tags;
        const page = parseInt(req.query.pag);
        const sort = req.query.sort;
        const fields = req.query.fields;

        const filtro = {};

        // Defino pagina
        const limit = 12;
        const skip = page*limit;

        // Defino filtro de nombre, (contiene)
        if( typeof(name) !== 'undefined' ) {
            filtro.name = new RegExp('^' + name, "i");
        }

        // Define filtro compra/venta (booleana)
        if( typeof(venta) !== 'undefined' ) {
            filtro.venta = venta;
        }

        // Defino filtro de etiquetas
        if( typeof(tags) !== 'undefined' ) {
            // Convert tags string into array
            filtro.tags = {$in: tags.split(/,|\s/)};
        }

        // Define filtro de precio
        if( typeof(price) !== 'undefined' ) {
            let precioArray = precio.split('-');
            precioArray = precioArray.map(parseFloat);

            if( precioArray.length == 1 ) {
                filtro.precio = precioArray[0];
            } else if( !isNaN(precioArray[0]) && !isNaN(precioArray[1]) ) {
                filtro.precio = {$gte: precioArray[0], $lte: precioArray[1]};
            } else if( !isNaN(precioArray[0]) ) {
                filtro.precio = {$gte: precioArray[0]};
            } else if( !isNaN(precioArray[1]) ) {
                filtro.precio = {$lte: precioArray[1]};
            } 
        }

        // cargo docs
        const docs = await Ad.list(filtro, skip, limit, sort, fields);

        res.json({success: true, data: docs});
    } catch(err) {
        next(err);
        return;
    };
});

/**
 * Cargo etiquetas
 */
router.get('/tags', async (req, res, next) => {
    try {
        const docs = await Ad.distinct('tags');
        res.json({success: true, data: docs});
    } catch(err) {
        next(err);
        return;
    }
});

/**
 * obtengo precio max
 */
router.get('/max_precio', async (req, res, next) => {
    try {
        const query = Ad.find();
        query.sort('-precio');
        query.limit(1);
        query.select('precio');

        const docs = await query.exec();
        res.json({success: true, data: docs});
    } catch(err) {
        next(err);
        return;
    }
});

/**
 * Insertar anuncio nuevo
 */
router.post('/', [
    body('precio').optional().isNumeric().withMessage('debe ser numérico'),
    body('venta').optional().isBoolean().withMessage('debe ser true o false'),
    body('tags').custom( value => { // comprobación de etiquetas correctas
        return new Promise( (resolve, reject) => {
            Ad.distinct('tags', (err, tags) => {
                const tagsPassed = value.split(/,|\s/);
                tagsPassed.forEach(tag => {
                    if(tags.indexOf(tag) == -1) {
                        return reject(); // etiqueta incorrecta
                    }
                });

                return resolve();
            })
        } ) 
    } ).withMessage('La etiquetas que has introducido son incorrectas.')
], async (req, res, next) => {
    try {
        // envio error de validación
        validationResult(req).throw();
        const data = req.body;

        // Convierto las etiquetas en array antes de insertar en BD
        data.tags = data.tags.split(/,|\s/);
        const ad = new Anuncio(data);

        // Guardo el anuncio en BD
        const doc = await anuncio.save();
        res.json({success:true, data: doc});
    } catch(err) {
        next(err);
        return;
    }
});

/**
 * Actualizo/modifico un anuncio por ID 
 */
router.put('/:id', [
    body('precio').optional().isNumeric().withMessage('debe ser numérico'),
    body('venta').optional().isBoolean().withMessage('debe ser true o false'),
    body('tags').custom( value => { // comprobar que se pasan etiquetas correctas
        return new Promise( (resolve, reject) => {
            Ad.distinct('tags', (err, tags) => {
                const tagsPassed = value.split(/,|\s/);
                tagsPassed.forEach(tag => {
                    if(tags.indexOf(tag) == -1) {
                        return reject(); // etiqueta incorrecta
                    }
                });

                return resolve();
            })
        } ) 
    } ).withMessage('Has añadido etiquetas incorrectas.')
], async (req, res, next) => {
    try {
        validationResult(req).throw();
        const data = req.body;
        const _id = req.params.id;

        // Convert tags passed to array before insert into database
        data.tags = data.tags.split(/,|\s/);
        
        const adUpdated = await Ad.findByIdAndUpdate(_id, data, {
            new: true
        });

        res.json({success: true, data: adUpdated});
    } catch(err) {
        next(err);
        return;
    }
});

/**
 * Borrar anuncio por ID
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;

        await Anuncio.remove( {_id: _id} ).exec();

        res.json( { success: true } );
    } catch(err) {
        next(err);
        return;
    }
})

module.exports = router;