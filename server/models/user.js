// user.js - schema/model for users in the MongoDB database

// Require the things
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

// Define the schema for a user
//  (A schema is an in-between step before the creation of the actual model.
//   It's used to define the data types of all the parts of a given entry)
var userSchema = mongoose.Schema({
  email: String,
  pwdHash: String,
  fName: String,
  lName: String,
  qIDs: [mongoose.Schema.Types.ObjectId]
});

// Define a method that compares an external password with the hashed password
//  stored in this entry
userSchema.methods.comparePassword = function(potentialPassword, cb) {
  bcrypt.compare(potentialPassword, this.pwdHash, cb);
};

module.exports = mongoose.model("User", userSchema);
