//controls access to app client files
//uses session/cookie authentication
//exposes a JWT token to be used by the angular app to be authenticated

//dependencies
var express = require('express');
var router = express.Router();

//secure app files
router.use('/', function(req, res, next){
  if (req.path !== '/login' && !req.session.token) {
        return res.redirect('/login?returnUrl=' + encodeURIComponent('/app' + req.path));
    }
    next();
});

//make JWT token available to the app
router.get('/token', function (req, res){
  res.send(req.session.token);
});
//serve files from the app route
router.use('/', express.static('app'));

module.exports = router;
