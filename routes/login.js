const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { query} = require('../models/db');
const { body, validationResult } = require('express-validator');


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


  
/*router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('login', {title:'schollsoft'});

});
/* post login*/
/*router.post('/', async function(req, res, next) {
  // res.send('respond with a resource');
  console.log(req.body);*/

  router.post('/',
  body('username').notEmpty().trim(),
  body('password').notEmpty(),
  async function(req, res,next) {
 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.render('login',{errors: errors.array()});
   //return res.status(400).json({ errors: errors.array() });
  }
  const username= req.body.username;
  const password= req.body.password;

    try{
      const sql ='SELECT password FROM users WHERE name=?';
      const result= await query(sql, username);

      if(result.length > 0){
        bcrypt.compare(password, result[0].password, function(err, result) {
          if (result == true){
            req.session.loggedin = true;
            req.session.username= username;
            res.redirect('/topsecret');       
          } else{
            res.render('login', { errors: 'bc false  username or password'});
          }
        });
      }else{
        res.render('login', { errors: 'rsest username or password'});
      }
    } catch(e){
      next(e);
      console.error(e);

  }
 });


module.exports = router;
