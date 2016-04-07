// addGenericUser.js - just a simple program to add a dummy user to the db
// Not commented more than this cuz it doesn't matter.

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var User = require("../models/user");

mongoose.connect('mongodb://localhost/bhssrc');

db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error: "));

db.once('open', function() {
  bcrypt.hash("password123", 10, function(err, hash) {
    if (err) {
      console.error("hashing error: ", err);
      return;
    }

    new User({
      "email": "bob123@dingbat.com",
      "pwdHash": hash,
      "fName": "Bob",
      "lName": "Tripuranaenenai"
    }).save(function(err) {
      if (err) {
        console.log("saving error: ", err);
      }
    });
  });

});
