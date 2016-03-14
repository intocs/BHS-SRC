//users api controller defines the routes responsible for user related operations
//such as authentication, registration, retrieving user data.
//dependencies
var config = require('config.json'); //our db config
var express = require('express'); //express
var router = express.Router(); //express router
var userService = require('services/UserService'); //use the API

router.post('/authenticate', authenticateUser);
router.post('/register', registerUser);
router.get('/current', getCurrentUser);
//explanation of module.exports in the user service
module.exports = router;
 //authenticate a user by username and password use userservice to get these pieces
 //because we have a seperate user SERVICE. all methods can be called with the pattern service.then.catch
function authenticateUser(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (token) {
            if (token) {
                // authentication successful
                res.send({ token: token });
            } else {
                // authentication failed. 401 means unuathorized. someone doesn't have a token.
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
          //400 means bad request
            res.status(400).send(err);
        });
}
 //register a user/create a user. use the user service to create a user
function registerUser(req, res) {
    //create method from the user service
    userService.create(req.body)
        .then(function () {
            //status 200 means success
            res.sendStatus(200);
        })
        .catch(function (err) {
            //status 400 means bad request
            res.status(400).send(err);
        });
}
 //get the user by id. again... in user service
function getCurrentUser(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                //status 404 means the server did not find anything
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
          //bad request
            res.status(400).send(err);
        });
}
