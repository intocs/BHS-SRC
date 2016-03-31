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
    modals = require("./modal"),
    Modal = modals.Modal,
    LoginModal = modals.LoginModal,
    SignupModal = modals.SignupModal,
    Header = require("./header").Header;

function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScrolling(){
    window.onscroll=function(){};
}

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

        openSignupModal()  {
            disableScrolling();
            this.setState({"signupModalOpen": true });
        }
        closeSignupModal() {
            enableScrolling();
            this.setState({"signupModalOpen": false});
        }

        openLoginModal()  {
            disableScrolling();
            this.setState({"loginModalOpen": true });
        }
        closeLoginModal() {
            enableScrolling();
            this.setState({"loginModalOpen": false});
        }
        
        render() {
          return (
            <div className="app">
              <div className={"appContent" + (this.state.signupModalOpen || this.state.loginModalOpen ? " blurred" : "")}>
                <Header>
                  <button id="logInButton" className="headerButton" onClick={ this.openLoginModal.bind(this) }>Log In</button>
                  <button id="signUpButton" className="headerButton" onClick={ this.openSignupModal.bind(this) }>Sign Up</button>
                </Header>
                <div id="questionContainer">
                  <QuestionList questionDataList={ testData.QUESTIONDATA } />
                </div>
              </div>
              <SignupModal isOpen={ this.state.signupModalOpen }
                onSigningUp={ this.closeSignupModal.bind(this) }
                onClosing={ this.closeSignupModal.bind(this) }
                onSwitchingToLogin={ (function() { this.closeSignupModal(); this.openLoginModal(); }).bind(this) } />
              <LoginModal isOpen={ this.state.loginModalOpen }
                onLoggingIn={ this.closeLoginModal.bind(this) }
                onClosing={ this.closeLoginModal.bind(this) }
                onSwitchingToSignup={ (function() { this.closeLoginModal(); this.openSignupModal(); }).bind(this) } />
            </div>
          );
        }
      }

      ReactDOM.render(<App/>, document.querySelector("#appContainer"));
  });
};
