var mongoose = require( 'mongoose' );
var bcrypt = require('bcryptjs');
var Schema   = mongoose.Schema;

var personas = new Schema({
	name				: String,
	surname 		: String,
	fullname 		: String,
	email  			: String,
	last_active : Date
})

var admins = new Schema ({
	username : String,
	password : String,
});

admins.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

/* If admin is true, then the admin said it */
var conversations = new Schema({
	persona	: {type: Schema.Types.ObjectId, ref: 'personas'},
	messages 		: [{
		date_sent : Date,
		content 	: String,
		admin 		: Boolean 
	}],
	last_active: Date,
	unread : {type: Boolean, default: true}
})

var settings = new Schema({
	autopilot : Boolean
});

mongoose.model( 'personas', personas );
mongoose.model( 'admins', admins );
mongoose.model( 'conversations', conversations );

mongoose.model( 'settings', settings );

mongoose.connect( 'mongodb://localhost/turing' );