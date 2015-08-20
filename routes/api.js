var mongoose = require( 'mongoose' );
var personas = mongoose.model( 'personas', personas );
var conversations = mongoose.model( 'conversations', conversations );
var settings = mongoose.model( 'settings', settings );

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/conversations', function(req, res, next) {
  conversations.find({}).populate('persona_id').sort({'last_active':-1}).exec(function(err,conversations){
  	res.json(conversations);
  })
});
router.put('/conversations/:conversation_id', function(req, res, next) {
  conversations.findOneAndUpdate({_id:req.params.conversation_id},{$set:{unread:req.body.unread}}).exec(function(err,conversation){
    if(err){
      res.json({status:'error'});
    }
    res.json({status:'ok'});
  })
});
router.get('/settings', function(req, res, next) {
  settings.findOne({},function(err,settings){
  	res.json(settings);
  })
});

router.put('/settings', function(req, res, next) {
  settings.findOneAndUpdate({},{autopilot:req.body.autopilot},function(err,settings){
  	res.json({status:'ok'});
  })
});

router.get('/personas/:persona_id/chat', function(req, res, next) {
  conversations.findOne({persona_id:req.params.persona_id}).populate('persona_id','_id name').exec(function(err,chat){
  	res.json(chat);
  })
});

module.exports = router;
