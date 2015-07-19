var express = require('express');
var router = express.Router();

var mongoose = require( 'mongoose' );
var personas = mongoose.model( 'personas', personas );
var conversations = mongoose.model( 'conversations', conversations );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/message',function(req,res){
	var persona = req.cookies.persona;
	var message = req.body.message;
	var avatar = req.body.avatar || false;
	var messageObj = {
		date_sent : Date.now(),
		content  	: message,
		admin  		: avatar
	};
	conversations.findOne({persona_id:persona},function(err,conversation){
		if(err){
			return;
		}

		if(!conversation){
			conversation = new conversations({
				persona_id : persona,
				messages : []
			});
		}

		conversation.messages.push(messageObj);

		conversation.save(function(err){
			if(err){
				return;
			}
			res.json({status:'ok'});
		})
	});
});

router.get('/personas',function(req,res){
	var persona = req.cookies.persona;
	personas.findOne({_id:persona},function(err,persona){
		if(err){
			return;
		}
		res.json(persona);
	})
});

router.put('/personas',function(req,res){
	var persona = req.cookies.persona;
	personas.findOneAndUpdate({_id:persona},{$set:{name:req.body.name}},function(err){
		if(err){
			return;
		}
		res.json({status:'ok'})
	})
});
module.exports = router;
