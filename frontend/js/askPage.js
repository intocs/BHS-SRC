// askPage.js - ask questions page JS file for the client-side

// The code in this file is written in JSX, an extension of JavaScript that allows for embedded XML. For your own
//  peace of mind, you might want to download the appropriate syntax-highlighting tools for your IDE of choice.

// require (import) the react and react-dom libraries
let React = require("react"), ReactDOM = require("react-dom");

let headerComponents = require("./header"),
    Header = headerComponents.Header,
    UserDropdown = headerComponents.UserDropdown;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPublic: true
    };
  }

  // Log out of the the private display
  logOut() {
    // Remove the token and redirect to the "/"
    window.localStorage.removeItem("jwtToken");
    location.href = "/";
  }

  render() {
    // Retrieve the account data from the JWT
    let accData = JSON.parse(atob(localStorage.jwtToken.split(".")[1]));

    // Retrieves the GET data from the URL
    let getData = new Map(
      location.search.substr(1).split("&").map(s => [s.split("=")[0], decodeURIComponent(s.split("=")[1])])
    );

    return (
      <div className="app">
        <div className="appContent">
          <Header>
            <UserDropdown username={ accData.given_name } onLogOut={ this.logOut.bind(this) }/>
          </Header>
          <div className="formContent">
            <input type="text" className="ask-subject" placeholder="Enter your question here..." defaultValue={getData.has("q") ? getData.get("q") : ""}/>
            <textarea className="ask-text" placeholder="Write your question in letter form here..."></textarea>
            <div className="ask-radio-container">
              Public? <input type="radio" name="isPublic" value="Yes" defaultChecked="true" onClick={ this.setState.bind(this, {isPublic: true}) } />Yes
                      <input type="radio" name="isPublic" value="No" onClick={ this.setState.bind(this, {isPublic: false}) } />No
            </div>
            { this.state.isPublic ? (
                <div className="ask-confirmation">
                  I understand that public questions will be visible to other students, and that once a question is asked,<br/>
                  an email is sent immediately to an alumnus <input type="checkbox" />
                </div>
              ) : null
            }
            <button className="ask-submit-button">Submit your question</button>
          </div>
        </div>
      </div>
    );
  }
}

// Exports a function which will carry out appropriate initing for askPage.html
module.exports = function () {
  window.addEventListener("load", function() {
      // Run this code when the window initially loads
      if (!!localStorage.jwtToken) {
        ReactDOM.render(<App />, document.querySelector("#appContainer"));
      } else {
        location.href = "/";
      }

  });
};
