var mongoose = require("mongoose");
var bcrypt = require("bcrypt");


var userSchema = mongoose.Schema({
  email: String,
  pwdHash: String,
  fName: String,
  lName: String
});

userSchema.methods.comparePassword = function(potentialPassword, cb) {
  bcrypt.compare(potentialPassword, this.pwdHash, cb);
};

module.exports = mongoose.model("User", userSchema);
