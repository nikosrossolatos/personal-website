var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.render('dashboard');
  console.log(__dirname)
  res.sendFile(path.join(__dirname + '/public/app/index.html'));
});
module.exports = router;
