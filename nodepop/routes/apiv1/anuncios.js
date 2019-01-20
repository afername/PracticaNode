'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncios')

/**GET /anuncios
 * obtener una lista de anuncios
 */


router.get('/', async (req, res, next) => {
  try{ // protegemos el código para recoger posibles excepciones

  //recogemos valores de entrada
  const name = req.query.name;
  const venta = req.query.venta;
  const precio = req.query.precio;
  const foto = req.query.foto;
  const tags = req.query.tags;

  const skip = parseInt(req.query.skip);
  const limit= parseInt(req.query.limit);
  const fields = req.query.fields;
  const sort = req.query.sort;

  const filter = {};

  if (name){
    filter.name = name;
  }

  if (venta){
    filter.venta = venta;
  }

  if (precio){
    filter.precio = precio;
  }

  if (tags){
    filter.tags = tags;
  }

  // buscamos anuncios en la base de datos

    const anuncios = await Anuncio.listar(filter, skip, limit, fields, sort);
    
    res.json({ 
      success: true, 
      results: anuncios });
  } catch(err){
    next(err);
    return;
  }
});


/**
 * GET /anuncios/:id
 * Obtener un anuncio
 */
router.get('/', async (req, res, next) => {
  try{
    const id = req.params.id;

    const anuncio = await Anuncio.findById(id).exec();
  
    res.json({ success: true, result: anuncio})

    }catch(err){
      next(err);
      return;
  }
});

module.exports = router;
