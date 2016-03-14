//The user service API encapsulates all data access and business logic for users behind a simple interface.
//It exposes methods for CRUD operations and user authentication.
//all service methods can be called with the pattern [service method].then(...).catch(...);
//dependencies
var config = require('config.json'); //db config
var mongo = require('mongodb'); //db
var monk = require('monk'); //makes db access easier
var db = monk(config.connectionString); //OUR db
var usersDb = db.get('users'); //list of users
var _ = require('lodash'); //library that makes working with arrays easier
var jwt = require('jsonwebtoken'); //JWT is an object that can tell you about a user and what theyre allowed to do. they are trusted.
var bcrypt = require('bcryptjs'); //library to help hash passwords
var Q = require('q'); //tool for creating async promises
var service = {};
//here is what we are going to put in our array to expose. 
service.authenticate = authenticate;
service.getById = getById;
service.create = create;
//a module encapsulates lots of code into a simple unit of code. we take all of our services up here and export them.
//service is the same array that we declared up there^^ we just added all of these wondrful functions into it
module.exports = service;
//all function names are self explanatory
function authenticate(username, password) {
    //you will see deferred a lot. q.defer is a promise. you can read more about promises, its unnecessary to comment.
    var deferred = Q.defer();
    //find one is a method we call on the list of our users. we call find one with paramas a username and a function.
    usersDb.findOne({ username: username }, function (err, user) {
        //in Q reject means some sort of exception happened. fulfilled means something good happened.
        if (err) deferred.reject(err);
        // authentication successful, the user and the hashed password match.
        if (user && bcrypt.compareSync(password, user.hash)) {
            //you can sign a jwt by typically using a userID as your subject, like below, we also use our db secret
            deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
        } else {
            // authentication failed
            deferred.resolve();
        }
    });
    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();
    //people are accessed in DB by ID's
    usersDb.findById(_id, function (err, user) {
        if (err) deferred.reject(err);
        //success
        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else { //failure
            // user not found
            deferred.resolve();
        }
    });
    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();
    // validation
    usersDb.findOne({ username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err);
            //we have found someone in this database who already exists
            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
              //good success they dont exist
                createUser();
            }
        });
        //private function inside create that creates a user.
        function createUser() {
            // set user object to userParam without the cleartext password
            var user = _.omit(userParam, 'password');
            // add hashed password to user object
            user.hash = bcrypt.hashSync(userParam.password, 10);
            //add person to DB
            usersDb.insert( user, function (err, doc) {
                  if (err) deferred.reject(err);
                  deferred.resolve();
              });
            //user has been created by now
        }
    return deferred.promise;
}
//down here we would also MAYBE have updating and deleting users.
//might be important to have in the future.
