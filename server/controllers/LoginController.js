//login controller defines routes for displaying the login view (which will be the homepage??) and authenticating user credentials.
//It uses the api to authenticate rather than using the user service directly,
//this is to keep the api (userservice)  and database layers cleanly separated from the rest of the application
//they could easily be split if necessary and run on separate servers.. we probably wont need to do that. \
//dependencies
var express = require('express'); //express
var router = express.Router(); //express router
var request = require('request'); //HTTP calls

router.get('/', function(req, res) {
  //log user out
  delete req.session.token;
  //move a success variable into a LOCAL varaiable so that it appears ONCE
  var viewData = {success: req.session.success };
  delete req.session.success;
  //render the login.. frontend you guys can make this fit with what you want to render.
  res.render('login', viewdata);
});

router.post('/', function(req, res){
  //authenticate user using API for nice seperation of layers
  request.post({
    url: config.apiUrl + '/users/authenticate',
    form: req.body,
    json: true
  }, function(error, response, body){
    if(error){
      //go to login empty if there was an issue
      return res.render('login', {error: 'An error occured'});
    }
    //if they arent authenticated meaning they didnt recieve thier token, they have an incorrect password
    if(!body.token){
      return res.render('login', {error: 'Username or password is incorrect'});
    }
    //save JWT token in the session to make it available to the app
    req.session.token = body.token;
    //redirect
    var returnURL = req.query.returnUrl && decodeURIComponenet(req.query.returnUrl) || '/';
    res.redirect(returnUrl);
  });
});
module.exports = router;
