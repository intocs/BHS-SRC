// alum.js - schema/model for alumni in the MongoDB database

// Require the things
var mongoose = require("mongoose");

// Define the schema for an alum
var alumSchema = mongoose.Schema({
  email: String,
  fName: String,
  lName: String
});

module.exports = mongoose.model("Alum", alumSchema);
