// temporary.js - schema/model for temporary users and alumni

// Require the things
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var User = require("user"),
    Alum = require("alum");

// Define the schema for a temporary user

var tempUserSchema = mongoose.Schema({
  email: String,
  pwdHash: String,
  fName: String,
  lName: String,
  createdAt: {type: Date, expires: 60 * 60 * 12, default: Date.new}
});

// Define a method that compares an external password with the hashed password
//  stored in this entry
tempUserSchema.methods.comparePassword = function(potentialPassword, cb) {
  bcrypt.compare(potentialPassword, this.pwdHash, cb);
};

tempUserSchema.methods.createUser = function() {
  this.remove();
  return new User({
    email: this.email,
    pwdHash: this.pwdHash,
    fName: this.fName,
    lName: this.lName
  });
};

// Define the schema for a temporary alum
var tempAlumSchema = mongoose.Schema({
  email: String,
  fName: String,
  lName: String,
  createdAt: {type: Date, expires: 60 * 60 * 12, default: Date.new}
});

tempAlumSchema.methods.createAlum = function() {
  this.remove();
  return new User({
    email: this.email,
    fName: this.fName,
    lName: this.lName
  });
};

module.exports = {
  tempAlum: mongoose.model("TempAlum", tempAlumSchema),
  tempUser: mongoose.model("TempUser", tempUserSchema)
};
