//questions.js - schema/model for questions in the MongoDB database

// Require the mongoose
var mongoose = require('mongoose');



// The answers key of a Question documents will be an instance of DocumentArray.
// This is a special subclassed Array that can deal with casting, and has special methods to work with embedded documents.

// Define the schema for an answer
var AnswerSchema = new mongoose.Schema({
  answerBody: String,
  author: String,
  date: Date
});

// Define the schema for a question
var QuestionSchema = new mongoose.Schema({
  isPublic: Boolean, // If the question is public.
  questionTitle: String,
  questionBody: String,
  author: mongoose.Schema.Types.ObjectId,
  answers: [AnswerSchema], // Array of answers
  date: Date // Good practice for every document to have a date created
});

// expose the model to the app
module.exports = {
  Question: mongoose.model("Question", QuestionSchema),
  Answer: mongoose.model("Answer", AnswerSchema)
};
