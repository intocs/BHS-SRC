var mongoose = require("mongoose"),
    express = require("express");

var User = require("./models/user");

mongoose.connect("mongodb://localhost/bhssrc");

var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error: "));

db.once('open', function() {
  console.log(User.find().pretty());
});


module.exports = function(app) {
  app.get('/api/user/');
};
