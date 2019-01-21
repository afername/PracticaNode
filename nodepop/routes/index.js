var express = require('express');
var router = express.Router();

const { query, params, body, validationResult } = require('express-validator/check');

/* GET home page. */



/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Express' });
});


module.exports = router;
