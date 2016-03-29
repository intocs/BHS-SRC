// main.js - main JS file for the client-side

// The code in this file is written in JSX, an extension of JavaScript that allows for embedded XML. For your own
//  peace of mind, you might want to download the appropriate syntax-highlighting tools for your IDE of choice.

// require (import) the react and react-dom libraries
let React = require("react"), ReactDOM = require("react-dom");


// require QuestionComponents.js
//  (N.B. since QuestionComponents.js is "require"d, it is automatically bundled
//  with the remainder of the code when it is compiled into bundle.js)
let questionComponents = require("./questionComponents"),
    QuestionList = questionComponents.QuestionList,
    testData = require("./testData"),
    headerComponents = require("./header"),
    Header = headerComponents.Header,
    UserDropdown = headerComponents.UserDropdown,
    SearchBar = require("./searchBar").SearchBar;

// Exports a function which will carry out appropriate initing for public.html
module.exports = function () {
  window.addEventListener("load", function() {
      // Run this code when the window initially loads

      class App extends React.Component {

        render() {
          return (
            <div className="app">
              <div className="appContent">
                <Header>
                  <UserDropdown username="Vinay"/>
                </Header>
                <div id="questionContainer">
                  <SearchBar />
                  <QuestionList questionDataList={ testData.QUESTIONDATA } />
                </div>
              </div>
            </div>
          );
        }
      }

      ReactDOM.render(<App/>, document.querySelector("#appContainer"));
  });
};
