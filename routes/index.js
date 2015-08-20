var express = require('express');
var router = express.Router();

var mongoose = require( 'mongoose' );
var personas = mongoose.model( 'personas', personas );
var conversations = mongoose.model( 'conversations', conversations );
var settings = mongoose.model( 'settings', settings );

var Surge = require('../surge-client.js');

var surge = new Surge();

surge.subscribe('dashboard');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { channel: req.cookies.persona });
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
		conversation.unread = true;
		conversation.last_active = Date.now();
		conversation.save(function(err){
			if(err){
				return;
			}
			surge.emit('dashboard','update conversation',conversation);
			settings.findOne({},function(err,settings){
				if(settings.autopilot){
					res.json({response:true});
				}
				else{
					res.json({status:'ok'});
				}
			})
		})
	});
});

router.post('/response',function(req,res){
	var persona = req.body.persona;
	var message = req.body.message;
	var admin = true;
	var messageObj = {
		date_sent : Date.now(),
		content  	: message,
		admin  		: admin
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
		conversation.last_active = Date.now();
		conversation.save(function(err){
			if(err){
				return;
			}
			surge.emit('dashboard','update conversation',conversation);
			if(admin){
				surge.emit(persona,'response',{response:message});
			}
			res.end();
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
	var name = req.body.name;
	personas.findOneAndUpdate({_id:persona},{$set:{name:name}},function(err){
		if(err){
			return;
		}
		surge.emit('dashboard','update name',{persona:persona,name:name});
		res.json({status:'ok'})
	})
});
module.exports = router;