//answers.js -- defines a model for answers to questions in MongoDB

//defines a schema for the comments model
var mongoose = require('mongoose');

// Define the schema for an answer
var answerSchema = new mongoose.Schema({
  body: String,
  author: String,
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }
});

module.exports = mongoose.model("Answer", answerSchema);
