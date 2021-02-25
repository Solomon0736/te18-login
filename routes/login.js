const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { query} = require('../models/db');
const { body, validationResult } = require('express-validator');
const Authcontroller = require('../controllers/Authcontroller')


/* GET users listing. */
router.get('/',Authcontroller.show);
router.post('/',
  body('username').notEmpty().trim().toLowerCase(),
  body('password').notEmpty(),
  body('rememberme').toBoolean(),

  Authcontroller.store
);
module.exports = router;

 
/*router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('login', {title:'schollsoft'});

});
/* post login*/
/*router.post('/', async function(req, res, next) {
  // res.send('respond with a resource');
  console.log(req.body);*/





