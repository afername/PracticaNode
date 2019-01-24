var express = require('express');
const router = express.Router();
const Anuncio =require('../models/Anuncio');

/* GET home page. */
router.get('/', async (req, res, next) => {
    try{
        const name = req.query.name;
        const venta = req.query.venta;
        const precio = req.query.precio;
        const foto = req.query.foto;
        const tags = req.query.tags;
        const page = parseInt(req.query.pag);
        const sort = req.query.sort;
        const fields = req.query.fields;

        const limiteNombre = 30;

        var filtro = {};
        var data = {};

        //paginación
        var limite = 12;
        const skip = page*limite;

        //definición de filtro de nombre (contiene)
        if (typeof(name) !== 'undefined'){
            filtro.name = new RegExp('^' + name, "i");
            data.name = name;
        }

        //definición de filtro por compra/venta (booleana)
        if (typeof(venta) !== 'undefined'){
            filtro.venta = venta;
        }

        //definición de filtro por etiquetas
        if (typeof(tags) !== 'undefined'){
            filtro.tags = {$in: tags.split(/,|\s/)};
            data.tags = tags.split(/,|\s/);
        }else{
            data.tags = [];
        }

        //obtener precio máximo
        const.query = Anuncio.find();
        query.sort('-precio');
        query.limite(1);
        query.select('precio');
        const max_precio = await query.exec();
        data.top_precio = max_precio[0].precio;

        //definición de filtro por precio 
        if( typeof(precio) !== 'undefined' ) {
            // Convierto precio de string a array
            let precioArray = precio.split('-');
            // Convierto a float
            precioArray = precioArray.map(parseFloat);

            // si sólo hay un argumento, uso busqueda coincidente en BD
            if( precioArray.length == 1 ) {
                filtro.precio = precioArray[0];
            // si hay precio max y min
            } else if( !isNaN(precioArray[0]) && !isNaN(precioArray[1]) ) {
                filtro.precio = {$gte: precioArray[0], $lte: precioArray[1]};
                data.min_precio = precioArray[0];
                data.max_precio = precioArray[1];
            // si sólo hay precio min
            } else if( !isNaN(precioArray[0]) ) {
                filtro.precio = {$gte: precioArray[0]};
                data.min_precio = precioArray[0];
                data.max_precio = data.top_precio;
            // si sólo hay precio max
            } else if( !isNaN(precioArray[1]) ) {
                filtro.precio = {$lte: precioArray[1]};
                data.max_precio = precioArray[1];
                data.min_precio = 0;
            }
        } else { // asigno valores por defecto
            data.min_precio = 0;
            data.max_precio = data.top_precio;
        }

        // cargo docs
        docs = docs.map(function(doc){
            if( doc.name.length > nameLengthLimit ) {
                doc.name = doc.name.substring(0, nameLengthLimit) + '...';
            }

            doc.tags = doc.tags.toString();

            return doc;
        });

        // cargo tags y compruebo si están seleccionadas
        const tags_docs = await Ad.distinct('tags');

        // Convierto las etiquetas en objetos y asigno checks
        data.tags = tags_docs.map(function(tag){
            let obj = {};
            obj.key = tag;
            obj.checked = '';

            if(data.tags.indexOf(tag) != -1 ) {
            obj.checked = 'checked';
            }

            return obj;
        });

        // Renderizo la vista
        res.render('index', {
            anuncios: docs,
            data: data
        });
  } catch(err) {
      next(err);
      return;
  };
});


module.exports = router;
