var mongoose = require( 'mongoose' );
var personas = mongoose.model( 'personas', personas );
var conversations = mongoose.model( 'conversations', conversations );

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/personas', function(req, res, next) {
  personas.find({},function(err,personas){
  	res.json(personas);
  })
});
module.exports = router;
