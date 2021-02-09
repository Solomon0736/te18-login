var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 // res.send('respond with a resource');
 res.render('login', {title:'schollsoft'});
});
/* post login*/
router.post('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('login') 
  console.log(req.body);

  const username= req.body.username;
  const password= req.body.password;

  if(password == "tikabo"){
    res.send('topsecret');
  }

 });

module.exports = router;
