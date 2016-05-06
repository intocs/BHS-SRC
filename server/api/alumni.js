var Alum = require("../models/alum.js");

var bcrypt = require("bcrypt");
var sanitize = require('mongo-sanitize');


module.exports = function(API, app) {
  app.post(API + "/register", (req, res) => {

    var fields = ["fName", "lName", "email", "authCode"];

    var conditions = {
      "fName":   (s) => (s !== "" && sanitize(s) === s),
      "lName":   (s) => (s !== "" && sanitize(s) === s),
      "email":   (s) => (s !== "" && /[^\s@]+@[^\s@]+\.[^\s@]+/.test(s) && sanitize(s) === s),
      "authCode": (s) => (s !== "" && sanitize(s) === s)
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

    Alum.count({email: req.body.email}, function(err, count) {
      if (err) {
        res.status(500).send("error testing for duplicate email");
        return;
      }
      if (count > 0) {
        res.status(400).send("duplicate email");
        return;
      }

      bcrypt.compare(req.body.authCode, '$2a$10$G8lltAunUqUOeX/4SiDU6eFCgqtgcsLqafhuqgfUbxpI9hJ4pWSdi', function(err, compRes) {

        if (err) {
          res.status(500).send("authCode match failure");
          return;
        }

        if (compRes) {
          new Alum({
            "email": req.body.email,
            "fName": req.body.fName,
            "lName": req.body.lName
          }).save(function(err) {
            if (err) {
              res.status(500).send("entry saving error");
            } else {
              res.status(200).send("success");
            }
          });
        } else {
          res.status(400).send("authCode does not match");
        }
      });
    });
  });
};
