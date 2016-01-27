var mongoose = require( 'mongoose' );
var personas = mongoose.model( 'personas', personas );
var conversations = mongoose.model( 'conversations', conversations );
var settings = mongoose.model( 'settings', settings );

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/conversations', function(req, res, next) {
  conversations.find({}).populate('persona').sort({'last_active':-1}).exec(function(err,conversations){
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
router.post('/conversations/:conversation_id',function (req,res,next){
  var message = req.body.message;
  var _id = req.params.conversation_id;
  var messageObj = {
    date_sent : Date.now(),
    content   : message,
    admin     : true
  };
  conversations.findOne({_id:_id},function(err,conversation){
    if(err){
      return res.end(404,err);
    }

    if(!conversation){
      return res.status(404).end('no such conversation found');
    }

    conversation.messages.push(messageObj);
    conversation.last_active = Date.now();
    conversation.save(function(err){
      if(err){
        return res.status(404).end(err);
      }

      //Socket response
      res.locals.surge.emit('dashboard','update conversation',conversation);
      res.locals.surge.emit(conversation.persona,'response',{response:message});
      res.status(200).json(messageObj);
    })
  });
});
router.get('/settings', function(req, res, next) {
  settings.findOne({},function(err,settings){
  	res.json(settings);
  })
});

router.put('/settings', function(req, res, next) {
  settings.findOneAndUpdate({},{autopilot:req.body.autopilot},function(err,settings){
  	res.status(200).json({status:'ok'});
  })
});

router.get('/personas/:persona_id/chat', function(req, res, next) {
  conversations.findOne({persona:req.params.persona_id}).populate('persona','_id name').exec(function(err,chat){
  	res.json(chat);
  })
});

module.exports = router;
