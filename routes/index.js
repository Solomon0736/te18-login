var express = require('express');
var router = express.Router();
const Authcontroller = require('../controllers/Authcontroller')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/logout', Authcontroller.destroy);

module.exports = router;
