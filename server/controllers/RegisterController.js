//Register Controller
//dependencies
var express = require('express'); //express
var router = express.Router(); //express router
var request = require('request'); //way to make HTTP calls
var config = require('config.json'); // db config
//guys can figure out what you want to server to render.
router.get('/', function(req, res){
  res.render('register');
});
//REGISTRATIONNNNNN
router.post('/', function(req, res){
  //register using the API. clean seperation
  request.post({
        //whatever you want to page to be FRONTEND DO THAT HERE
        url: config.apiUrl + '/users/register',
        form: req.body,
        json: true
    }, function (error, response, body) {
        //somethign bad happened during regsitration
        if (error) {
            return res.render('register', { error: 'An error occurred' });
        }
        //if something WASNT succesful
        if (response.statusCode !== 200) {
          //in all situations I just reroute to register with error messages
            return res.render('register', {
                error: response.body,
                username: req.body.username
            });
        }
        // if nothing bad happens, return to home page with success message
        req.session.success = 'Registration successful';
        return res.redirect('/home');
    });

});
module.exports = router;
