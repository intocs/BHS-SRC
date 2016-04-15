//questions.js - schema/model for questions in the MongoDB database

// Require the mongoose
var mongoose = require('mongoose');

// Define the schema for a question
var Questions = new mongoose.Schema({
  public: Boolean, //if the quesiton is public.
  questionTitle: String,
  questionBody: String,
  answers: [Answers], //array of answers
  date: Date //good practice for every document to have a date created
});

//The answers key of a Question documents will be an instance of DocumentArray.
//This is a special subclassed Array that can deal with casting, and has special methods to work with embedded documents.

// Define the schema for an answer
var Answers = new mongoose.Schema({
  answerBody: String,
  author: String,
  date: Date
});
//expose the model to the app
module.exports = mongoose.model("Question", Questions);
