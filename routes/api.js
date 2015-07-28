var mongoose = require( 'mongoose' );
var personas = mongoose.model( 'personas', personas );
var conversations = mongoose.model( 'conversations', conversations );

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/conversations', function(req, res, next) {
  conversations.find({}).populate('persona_id').sort({'last_active':-1}).exec(function(err,conversations){
  	res.json(conversations);
  })
});

router.get('/personas/:persona_id/chat', function(req, res, next) {
  conversations.findOne({persona_id:req.params.persona_id}).populate('persona_id','_id name').exec(function(err,chat){
  	res.json(chat);
  })
});

module.exports = router;
