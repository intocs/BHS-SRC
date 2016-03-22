// main.js - main JS file for the client-side

// The code in this file is written in JSX, an extension of JavaScript that allows for embedded XML. For your own
//  peace of mind, you might want to download the appropriate syntax-highlighting tools for your IDE of choice.

// require (import) the react and react-dom libraries
let React = require("react"), ReactDOM = require("react-dom");


// require QuestionComponents.js
//  (N.B. since QuestionComponents.js is "require"d, it is automatically bundled
//  with the remainder of the code when it is compiled into bundle.js)
let QuestionComponents = require("./QuestionComponents");

// Some placeholder data to test out the question display system with
let questionDataPlaceholder = [
  {
    question: "How's the water at UM in Flint, MI?",
    asker: "John Lastname",
    responder: "Plssendhelp",
    responderCredentials: "Flint, MI",
    answer: "AUUGGGGGGHHHH!!!!!"
  }, {
    question: "What's the food like at UT Austin?",
    asker: "Vinay T.",
    responder: "Some guy",
    responderCredentials: "Austin, TX",
    answer: "Literally the most delicious food I've never tasted..."
  }, {
    question: "How do you spell Vijay's and Vinay's last name?",
    asker: "John Lastname",
    responder: "Vinay T.",
    responderCredentials: "Barrington, IL",
    answer: "TRIPURANEANENIANEEAEENENAENI!!!!!!!"
  }
];


window.addEventListener("load", function() {
    // Run this code when the window initially loads

    // Render a QuestionList containing the placeholder data
    ReactDOM.render(
        <QuestionComponents.QuestionList data={questionDataPlaceholder} />,
        $('div#questionContainer')[0]
    );
});

// module.exports is a variable which designates which object(s) will be available when require()
//  is called on this file from another one.

module.exports = [];
