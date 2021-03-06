// mainPage.js - main page JS file for the client-side

// The code in this file is written in JSX, an extension of JavaScript that allows for embedded XML/HTML. For your own
//  peace of mind, you might want to download the appropriate syntax-highlighting tools for your IDE of choice.

// require (import) the react and react-dom libraries
let React = require("react"), ReactDOM = require("react-dom");


// require ALL THE FILES. Not anywhere near all of them :'(
let questionComponents = require("./questionComponents"),
    QuestionList = questionComponents.QuestionList,
    testData = require("./testData");

let headerComponents = require("./header"),
    Header = headerComponents.Header,
    UserDropdown = headerComponents.UserDropdown,
    SearchBar = require("./searchBar").SearchBar;

let modals = require("./modal"),
    Modal = modals.Modal,
    LoginModal = modals.LoginModal,
    SignupModal = modals.SignupModal;

// The next two methods disable and enable scrolling on the page, respectively
//  They are used to make the modals behave more tamely when they are opened

function disableScrolling(){
  let x = window.scrollX,
      y = window.scrollY;
  window.onscroll = window.scrollTo.bind(window, x, y);
}

function enableScrolling(){
  window.onscroll = function() {};
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "signupModalOpen": false,      // State variable representing whether the signup modal is open
      "loginModalOpen": false,       // State variable representing whether the login modal is open
      "isLoggedIn": props.isLoggedIn // State variable representing whether or not the user is logged in
    };
  }


  // The next 4 methods are relatively self-explanatory, I hope.
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

  logIn(email, password) {

    // Send a request to the server to log in given the credentials.
    $.ajax({
      "type": "POST",
      "url": "/api/users/login",
      "data": {
        "email": email,
        "password": password
      },
      "success": function(data) {
        // When I get back the token...
        // Store it in localStorage so that it is persistent across window-closes and stuff
        window.localStorage.jwtToken = data;

        // Close any modals that might be open in the public display
        this.closeSignupModal();
        this.closeLoginModal();

        // Set the state to not being logged in, to display the private part of the UI
        this.setState({"isLoggedIn": true});
      }.bind(this),
      "error": function(xhr, type, err) {
        // console.log("LOGIN ERROR [", xhr, type, err, "]");
      }
    });
  }

  // Log out of the the private display
  logOut() {
    // Remove the token and set the state
    window.localStorage.removeItem("jwtToken");
    this.setState({"isLoggedIn": false});
  }

  // Sign Up!
  signUp(formData) {

    // Send a request to the server to sign up given the credentials.
    $.ajax({
      "type": "POST",
      "url": "/api/users/signup",
      "data": {
        "fName": formData.fName,
        "lName": formData.lName,
        "email": formData.email,
        "pwd": formData.pwd
      },
      "success": function(data) {
        // When I get a success message... close the modals.
        //  (DO NOT log in, opens up potential security hole (?) )
        this.closeSignupModal();
        this.closeLoginModal();
      }.bind(this),
      "error": function(xhr, type) {
        // Something got messed up. TODO: deal with this in a way tht makes sense
        // console.log("SIGNUP ERROR [", type, "]");
      }
    });
  }

  submitSearch(query) {
    location.href = `/ask?q=${ encodeURIComponent(query) }`;
  }

  render() {
    // If logged in...
    if (this.state.isLoggedIn) {
      // Retrieve the account data from the JWT
      let accData = JSON.parse(atob(localStorage.jwtToken.split(".")[1]));
      return (
        <div className="app">
          <div className="appContent">
            <Header>
              <UserDropdown username={ accData.given_name } onLogOut={ this.logOut.bind(this) }/>
            </Header>
            <div id="questionContainer">
              <SearchBar onSearchSubmitted={ this.submitSearch.bind(this) }/>
              <QuestionList questionDataList={ testData.QUESTIONDATA } />
            </div>
          </div>
        </div>
      );
    } else {
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
            onSigningUp={ this.signUp.bind(this) }
            onClosing={ this.closeSignupModal.bind(this) }
            onSwitchingToLogin={ (function() { this.closeSignupModal(); this.openLoginModal(); }).bind(this) } />
          <LoginModal isOpen={ this.state.loginModalOpen }
            onLoggingIn={ this.logIn.bind(this) }
            onClosing={ this.closeLoginModal.bind(this) }
            onSwitchingToSignup={ (function() { this.closeLoginModal(); this.openSignupModal(); }).bind(this) } />
        </div>
      );
    }
  }
}

// Exports a function which will carry out appropriate initing for public.html
module.exports = function () {
  window.addEventListener("load", function() {
      // Run this code when the window initially loads
      ReactDOM.render(<App isLoggedIn={ !!window.localStorage.jwtToken } />, document.querySelector("#appContainer"));
  });
};
