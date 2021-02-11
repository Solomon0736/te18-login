var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/topsecret',function(req,res,next){
    if(req.session.loggedin){
    }else{
        res.send('please login to view this page!');
    }

})

module.exports = router;
