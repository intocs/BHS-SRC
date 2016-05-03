// users.js - file that manages routes associated with apis dealing with users

// require the things
//side note we can also require a model directly with mongoose
var User = require("../models/user.js");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var sanitize = require('mongo-sanitize');


// export...
module.exports = function(API, app) {
  app.post(API + '/login', (req, res) => {
    // Run this when a post is retrieved at the login part of the API

    // Confirm that an email and password were included in the request
    if (!req.body.email) {
      res.status(400).send("email required");
      return;
    }
    if (!req.body.password) {
      res.status(400).send("password required");
      return;
    }

    // Find a user with the given email...
    User.findOne({ email: sanitize(req.body.email) }, function(err, user) {

      // If there is no such user or the db access failed...
      if (err || !user) {
        res.status(400).send("unregistered email");
        return;
      }

      // Compare the password received from the login request with the one in the db...
      user.comparePassword(req.body.password, function(err, compRes) {

        // If there was an error comparing the passwords...
        if (err) {
          res.status(400).send("password match error");
          return;
        }

        // If the password matched the one in the DB...
        if (compRes) {
          // Create a JWT token with the email address, first name, last name, and a secret
          var token = jwt.sign({
            "email": user.email,
            "given_name": user.fName,
            "family_name": user.lName
          }, "5o0pers3ecr3tl33t");
          // Return the token to the client
          res.status(200).json(token);
        } else {
          res.status(400).send("negative password match");
        }
      });
    });

  });

  app.post(API + '/signup', (req, res) => {
    // Run this when a post is retrieved at the signup part of the API

    var fields = ["fName", "lName", "email", "pwd"];

    var conditions = {
      "fName":   (s) => (s !== "" && sanitize(s) === s),
      "lName":   (s) => (s !== "" && sanitize(s) === s),
      "email":   (s) => (s !== "" && /[^\s@]+@[^\s@]+\.[^\s@]+/.test(s) && sanitize(s) === s),
      "pwd":     (s) => (s !== "" && sanitize(s) === s),
      "authCode": (s) => (s !== "")
    };

    // make sure that all of the fields were sent in some form to here
    for (var i in fields) {
      var f = fields[i];

      // Check that each field exists
      if (!req.body[f]) {
        res.status(400).send("missing " + f);
        return;
      }

      // Check that each field is valid
      if (!conditions[f](req.body[f])) {
        res.status(400).send("invalid " + f);
        return;
      }
    }

    bcrypt.compare(req.body.authCode, '$2a$10$G8lltAunUqUOeX/4SiDU6eFCgqtgcsLqafhuqgfUbxpI9hJ4pWSdi', function(err, compRes) {
      if (err) {
        res.status(500).send("authCode match failure");
        return;
      }

      if (!compRes) {
        res.status(400).send("authCode does not match");
        return;
      }


      // Hash the password with the given parameters (including salting and the like)
      bcrypt.hash(req.body.pwd, 10, function(err, hash) {

        // If there was an error hashing...
        if (err) {
          res.status(400).send("pwd hashing error");
          return;
        }


        User.find({email: req.body.email}, function(err, count) {

          if (err) {
            res.status(500).send("account lookup error");
            return;
          }
          if (count < 0) {
            res.status(400).send("duplicate email");
            return;
          }
          // Create a user with the given credentials and save it
          new User({
            "email": req.body.email,
            "pwdHash": hash,
            "fName": req.body.fName,
            "lName": req.body.lName
          }).save(function(err) {
            // If there was an error saving it...
            if (err) {
              console.error("saving error: ", err);
              res.status(400).send("entry saving error");
            } else {
              res.status(200).send("success");
            }
          });
        });


      });
    });

  });
};
