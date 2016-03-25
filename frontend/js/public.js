// main.js - main JS file for the client-side

// The code in this file is written in JSX, an extension of JavaScript that allows for embedded XML. For your own
//  peace of mind, you might want to download the appropriate syntax-highlighting tools for your IDE of choice.

// require (import) the react and react-dom libraries
let React = require("react"), ReactDOM = require("react-dom");


// require QuestionComponents.js
//  (N.B. since QuestionComponents.js is "require"d, it is automatically bundled
//  with the remainder of the code when it is compiled into bundle.js)
let questionComponents = require("./questionComponents"),
    testData = require("./testData"),
    Modal = require("./modal").Modal;

// Exports a function which will carry out appropriate initing for public.html
module.exports = function () {
  window.addEventListener("load", function() {
      // Run this code when the window initially loads

      // Render a QuestionList containing the placeholder data
      ReactDOM.render(
          <questionComponents.QuestionList data={ testData.QUESTIONDATA } />,
          document.querySelector("#questionContainer")
      );

      ReactDOM.render(
          <Modal contentGenerator={ function(closeFunction) {
            return (
              <div className="modalContents">
                This is a dank (c) modal<br/>
                <button onClick={ closeFunction }>Close</button>
              </div>
            );
          }} />,
          document.querySelector("#modalContainer")
      );
  });
};
