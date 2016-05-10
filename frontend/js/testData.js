// testData.js - exports any mock/test data that is being used elsewhere in the app
// TODO: by the time the app is finished, all external references to this file should be removed!

module.exports = {
  QUESTIONDATA: [ {
    questionTitle: "How's the water at UM in Flint, MI?",
    questionBody: "Well, how is it?",
    author: "John Lastname",
    date: "5/9/16",
    answers: [{
      answerBody: "AwwwFul",
      author: "Your Mom",
      date: "5/10/16"
    }]
  }, {
    questionTitle: "What's the food like at UT Austin?",
    questionBody: "Well, I hear it's super tasty... So how is it?",
    author: "Vinay T.",
    date: "5/10/16",
    answers: [{
      answerBody: "Preeety good",
      author: "Vijay T.",
      date: "5/10/16"
    }]
  }, {
    questionTitle: "How do you spell Vijay's and Vinay's last name?",
    questionBody: "I was just wondering for linguistic reasons",
    author: "John Lastname",
    date: "5/9/16",
    answers: [{
      answerBody: "Tripwiefpwiehfaweifnpaiwenf",
      author: "Your Mom",
      date: "5/10/16"
    }]
  }
]
};
