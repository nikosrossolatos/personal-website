var express = require('express');
var router = express.Router();

var mongoose = require( 'mongoose' );
var personas = mongoose.model( 'personas', personas );
var conversations = mongoose.model( 'conversations', conversations );
var settings = mongoose.model( 'settings', settings );


/* GET home page. */
router.get('/', function(req, res, next) {
	var persona_id;
	// Check cookies.js for req.persona._id
	req.cookies.persona ? persona_id = req.cookies.persona : persona_id = req.persona._id;
  res.render('index', { channel: persona_id });
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
	conversations.findOne({persona:persona},function(err,conversation){
		if(err){
			return;
		}

		if(!conversation){
			conversation = new conversations({
				persona : persona,
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
			res.locals.surge.emit('dashboard','update conversation',conversation);
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
	conversations.findOne({persona:persona},function(err,conversation){
		if(err){
			return;
		}

		if(!conversation){
			conversation = new conversations({
				persona : persona,
				messages : []
			});
		}

		conversation.messages.push(messageObj);
		conversation.last_active = Date.now();
		conversation.save(function(err){
			if(err){
				return;
			}
			res.locals.surge.emit('dashboard','update conversation',conversation);
			if(admin){
				res.locals.surge.emit(persona,'response',{response:message});
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
		res.locals.surge.emit('dashboard','update name',{persona:persona,name:name});
		res.json({status:'ok'})
	})
});
module.exports = router;