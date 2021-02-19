const bcrypt = require('bcrypt');
const { query} = require('../models/db');
const { body, validationResult } = require('express-validator');

module.exports.show= async function(req,res,next){
    // loggiken vara att vissalogin form
    return res.render('login');
};

module.exports.destroy= async function(req,res,next){
    // loggiken vara att vissalogin form
   req.session.loggedin= false;
   req.session.destroy();  
   return res.redirect('/');
    
};
module.exports.store= async function(req,res,next){
    // logiken att loggin användare
 
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
                res.redirect('/home');       
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
} 

