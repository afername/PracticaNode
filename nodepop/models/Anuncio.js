'use strict';

const mongoose = require('mongoose');

// definimos el esquema
const anuncioSchema = mongoose.Schema({
  name: { type: String, index: true },
  venta: { type: Boolean, index: true },
  precio: { type: Number, index: true },
  foto: { type: String, index: false },
  tags: { type: [String], index: true },
}, { collection: 'anuncios' });

/**
 * Listado de anuncios con opciones de filtro
 * @param {object} filter 
 * @param {integer} skip 
 * @param {integer} limit 
 * @param {string} sort 
 * @param {string} fields 
 */

//creo un método estático con el esquema anuncioSchema
anuncioSchema.statics.listar = (filtro, skip, limit, fields, sort) => {
  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);
  return query.exec();
}

// creo el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
