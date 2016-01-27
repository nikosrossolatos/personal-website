var mongoose = require( 'mongoose' );
var personas = mongoose.model( 'personas', personas );

exports.check = function(req,res,next){
	if(!req.cookies.persona){
		createPersona(res,req,function(){
			next();
		});
	}
	else{
		personas.findOne({_id:req.cookies.persona},function(err,persona){
			console.log(persona);
			if(!persona){
				createPersona(res,function(){
					next();
				})
			}
			else{
				next();
			}
		});
	}
}
function createPersona(res,req,callback){
	var persona = new personas({
		last_active : Date.now()
	});
	persona.save(function(err){
		if(err){
			return;
		}
		// Problem : Cookie will be empty, client wont be able to subscribe to the right channel
		// Why : Cookie will be initialized when the response ends on the client. Until then the res.cookie will be empty for rendering
		// at the first time of calling the index page
		// Solution: Keep the persona_id at the request object that gets passed through the middleware.
		req.persona = persona;
		res.cookie('persona',persona._id, { expires:new Date(Date.now()+15552000000), httpOnly: true });
		callback(persona._id);
	});
}