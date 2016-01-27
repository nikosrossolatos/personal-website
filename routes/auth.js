var mongoose = require( 'mongoose' );
var personas = mongoose.model( 'personas', personas );
var conversations = mongoose.model( 'conversations', conversations );
var settings = mongoose.model( 'settings', settings );
var admins = mongoose.model( 'admins', admins );
var jwt = require('jwt-simple');
var bcrypt = require('bcryptjs');
var moment = require('moment');
var express = require('express');
var router = express.Router();


// var admin = new admins({
//   username:'spideynr',
// });

// var password = 'MYPASSWORDISHERE;

// bcrypt.genSalt(10,function(err,salt){
//   bcrypt.hash(password,salt,function(err,hash){
//     admin.password = hash;
//     admin.save(function(err,user){
//       console.log("saveD?!");
//       console.log(user);
//     })
//   });
// });

router.post('/login',function (req, res) {
    admins.findOne({username: req.body.UserName}, function (err, user) {
      console.log(req.body.UserName);
      console.log(user);
        if (!user) {
            return res.status(401).json({message: 'Wrong username and/or password'});
        }
        user.comparePassword(req.body.Password, function (err, isMatch) {
            if (!isMatch) {
                return res.status(401).send({message: 'Wrong username and/or password'});
            }
            res.send({token: createJWT(user)});
        });
    });
});

var createJWT = function(user){
  var payload = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, 'The greetings Odyssey portray garages certainty today');
}

module.exports = router;
