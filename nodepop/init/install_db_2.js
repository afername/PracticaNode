'use strict';

/**
 * Creo datos iniciales de la BBDD
 */

const readline = require('readline');

const db = require('../lib/connectMongoose');
const Anuncio = require('../models/Anuncio');
const anunciosData = require('./data/anuncios.json');

db.once('open', async () => {
    try{
        //pregunta de seguridad para evitar borrar la BD al arrancar
        const respuesta = await askUser('Estás seguro de que quieres que borre TODA la Base de Datos? (no) ');

        if (respuesta.toLowerCase() !== 'si'){
            console.log('Abortado!');
            process.exit(0);
        }

        //await initAnuncios();
        await initModel(Anuncio, anunciosData, 'anuncios');

        db.close();

    }catch(err){
        console.log('Hubo un error', err);
        process.exit(1);
    }
});


function askUser(question){
    return new Promise((resolve, reject) => {
    const interfaz = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    interfaz.question(question, answer => {
      interfaz.close();
      resolve(answer);
      return;
    });
  });
}

async function initAnuncios() {
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.n} anuncios.`);

  const insertados = await Anuncio.insertMany(anunciosData);
  console.log(`Insertados ${insertados.length} anuncios.`);
}

async function initModel(Model, data, modelName) {
  const deleted = await Model.deleteMany();
  console.log(`Eliminados ${deleted.n} ${modelName}.`);

  const insertados = await Model.insertMany(data);
  console.log(`Insertados ${insertados.length} ${modelName}.`);
}