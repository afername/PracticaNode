var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// creo conexión a la BD
console.log('connection to Mongoose created');
require('./lib/connectMongoose');

// modelos de BD
require('./models/Anuncio');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/apiv1/anuncios')

var app = express();

// view engine setup
console.log('establezco las rutas de las vistas');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// rutas de nuestro API
console.log('middleware de llamada a ruta de nuestro API');
app.use('/apiv1/anuncios', apiRouter);

//cargar ficheros estáticos
app.use(express.static(path.join(__dirname, 'public')));


//Variables locales de vistas
/*console.log('defino variables locales de vistas');
app.locals.titulo = 'NodePop';
app.locals.config = {
  limitPag: 12;
};
*/

//rutas de index y users (vistas en front)
console.log('middleware de llamada a rutas de index y users');
app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
console.log('middleware de error 404, entro si no he encontrado la ruta');
app.use(function(req, res, next) {
  console.log('No he encontrado la ruta');
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if(err.array) { // validation error
      err.status = 422;
      const errInfo = err.array({ onlyFirstError: true })[0]; // muestra solo 1 error
      err.message = `Not valid - ${errInfo.param} : ${errInfo.msg}`;
  }

  // render the error page
  res.status(err.status || 500);

  // Si recibimos petición de API, respondemos con JSON
  if( isAPI(req) ) {
    res.json( { success: false, error: err.message } );
    return;
  } else {
    res.render('error');
  }
});

function isAPI(req) {
  return req.originalUrl.indexOf( '/apiv' ) === 0;
}


module.exports = app;
