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

      class App extends React.Component {

        constructor(props) {
          super(props);
          this.state = {
            "signupModalOpen": false,
            "loginModalOpen": false
          };
        }

        openSignupModal()  { this.setState({"signupModalOpen": true }); }
        closeSignupModal() { this.setState({"signupModalOpen": false}); }

        openLoginModal()  { this.setState({"loginModalOpen": true }); }
        closeLoginModal() { this.setState({"loginModalOpen": false}); }

        render() {
          return (
            <div className="app">
              <div className={"appContent" + (this.state.signupModalOpen || this.state.loginModalOpen ? " blurred" : "")}>
                <header>
                  <h1 className="pageHeader">BHS Science Career Center</h1>
                  <button id="logInButton" className="headerButton" onClick={ this.openLoginModal.bind(this) }>Log In</button>
                  <button id="signUpButton" className="headerButton" onClick={ this.openSignupModal.bind(this) }>Sign Up</button>
                  <hr className="headerLine" />
                </header>
                <div id="questionContainer">
                  <questionComponents.QuestionList questionDataList={ testData.QUESTIONDATA } />
                </div>
              </div>
              <Modal isOpen={ this.state.signupModalOpen }>
                Sign Up Stuffs<br/>
                <button onClick={ this.closeSignupModal.bind(this) }>Close</button>
              </Modal>
              <Modal isOpen={ this.state.loginModalOpen }>
                Log In Stuffs<br/>
                <button onClick={ this.closeLoginModal.bind(this) }>Close</button>
              </Modal>
            </div>
          );
        }
      }

      ReactDOM.render(<App/>, document.querySelector("#appContainer"));
  });
};
