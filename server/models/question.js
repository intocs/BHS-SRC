//questions.js - schema/model for questions in the MongoDB database

// Require the things
var mongoose = require('mongoose');

// Define the schema for a question
var questionSchema = new mongoose.Schema({
  title: String,
  body: String,
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }]
});

module.exports = mongoose.model("Question", questionSchema);
