const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { query} = require('../models/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
 // res.send('respond with a resource');
 res.render('login', {title:'schollsoft'});
});

router.get('/kryptan/:pwd', function(req, res, next) {
  
  const myPlaintextPassword = req.params.pwd;
 
  bcrypt.hash(myPlaintextPassword, 10 , function(err, hash) {
   
    res.json({
      pwd: hash
    // Store hash in your password DB.
    });
  });

});
  
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('login', {title:'schollsoft'});
});

/* post login*/
router.post('/', function(req, res, next) {
  // res.send('respond with a resource');
  console.log(req.body);

  const username= req.body.username;
  const password= req.body.password;

  if(password == "tikabo"){

    req.session.loggedin = true;
    req.session.username= username;
    res.redirect('/topsecret')

  }else{
    res.render(
      'login',
       {
         title:'Schoolsoft',
         error: 'fel!'
       }
    );
  }

 });

module.exports = router;
