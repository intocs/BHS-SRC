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
    SignupModal = modals.SignupModal,
    AlumModal = modals.AlumModal;

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
      "alumModalOpen": false,
      "isLoggedIn": props.isLoggedIn, // State variable representing whether or not the user is logged in
      "curQuestionData": []
    };
    if (window.localStorage.jwtToken) this.requestCurQuestionData();
  }


  // The next 6 methods are relatively self-explanatory, I hope.
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

  openAlumModal()  {
      disableScrolling();
      this.setState({"alumModalOpen": true });
  }
  closeAlumModal() {
      enableScrolling();
      this.setState({"alumModalOpen": false});
  }

  logIn(formData) {

    // Send a request to the server to log in given the credentials.
    $.ajax({
      "type": "POST",
      "url": "/api/users/login",
      "data": {
        "email": formData.email,
        "password": formData.password
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
        this.requestCurQuestionData();
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
    this.setState({"curQuestionData": []});
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
        "pwd": formData.pwd,
        "authCode": formData.authCode
      },
      "success": function(data) {
        // When I get a success message... close the modals.
        //  (DO NOT log in, opens up potential security hole (?) )
        this.closeSignupModal();
        this.closeLoginModal();
      }.bind(this),
      "error": function(xhr, type) {
        if (xhr.status == 400) {
          var errorMsg = xhr.responseText;
          if (errorMsg == "authCode does not match") {
            $(this.refs.signupmodal.refs.authCode).addClass("invalid");
          }
        }
      }.bind(this)
    });
  }

  registerAlum(formData) {
    $.ajax({
      "type": "POST",
      "url": "/api/alumni/register",
      "data": {
        "fName": formData.fName,
        "lName": formData.lName,
        "email": formData.email,
        "authCode": formData.authCode
      },
      "success": function(data) {
        // When I get a success message... close the modals.
        //  (DO NOT log in, opens up potential security hole (? NB: Maybe not actually) )
        this.closeAlumModal();
      }.bind(this),
      "error": function(xhr, errorType, error) {
        // Something got messed up. TODO: deal with this in a way tht makes sense
        // console.log("SIGNUP ERROR [", type, "]");
        if (xhr.status == 400) {
          var errorMsg = xhr.responseText;
          if (errorMsg == "authCode does not match") {
            $(this.refs.alummodal.refs.authCode).addClass("invalid");
          }
        }
      }.bind(this)
    });
  }

  submitSearch(query) {
    location.href = `/ask?q=${ encodeURIComponent(query) }`;
  }

  requestCurQuestionData() {
    console.log("hi");
    $.ajax({
      "type": "POST",
      "url": "/api/questions/retrieveByNumber",
      "data": {
        "number": 10,
      },
      "headers": {
        "Authorization": "Bearer " + window.localStorage.jwtToken
      },
      "success": function(data) {
        console.log(data);
        this.setState({"curQuestionData": JSON.parse(data)});
      }.bind(this),
      "error": function(xhr, type, err) {
        console.log("qdata request ERROR [", xhr, type, err, "]");
      }
    });
  }

  render() {
    console.log("hi");
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
              <QuestionList questionDataList={ this.state.curQuestionData } />
            </div>
          </div>
        </div>
      );
    } else {

      return (
        <div className="app">
          <div className={"appContent" + (this.state.signupModalOpen || this.state.loginModalOpen || this.state.alumModalOpen ? " blurred" : "")}>
            <Header>
              <button id="logInButton" className="headerButton" onClick={ this.openLoginModal.bind(this) }>Log In</button>
              <button id="signUpButton" className="headerButton" onClick={ this.openSignupModal.bind(this) }>Sign Up</button>
              <button id="alumButton" className="headerButton" onClick={ this.openAlumModal.bind(this) }>Register an Alum</button>
            </Header>
            <div id="questionContainer">
              <QuestionList questionDataList={ testData.QUESTIONDATA } />
            </div>
          </div>
          <SignupModal isOpen={ this.state.signupModalOpen }
            onSigningUp={ this.signUp.bind(this) }
            onClosing={ this.closeSignupModal.bind(this) }
            onSwitchingToLogin={ (function() { this.closeSignupModal(); this.openLoginModal(); }).bind(this) }
            ref="signupmodal" />
          <LoginModal isOpen={ this.state.loginModalOpen }
            onLoggingIn={ this.logIn.bind(this) }
            onClosing={ this.closeLoginModal.bind(this) }
            onSwitchingToSignup={ (function() { this.closeLoginModal(); this.openSignupModal(); }).bind(this) } />
          <AlumModal isOpen={ this.state.alumModalOpen }
            onClosing={ this.closeAlumModal.bind(this) }
            onRegistering={ this.registerAlum.bind(this) } ref="alummodal" />
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
