let React = require("react"), ReactDOM = require("react-dom");

let questionComponents = require("./questionComponents"),
    QuestionList = questionComponents.QuestionList,
    testData = require("./testData");

let headerComponents = require("./header"),
    Header = headerComponents.Header,
    UserDropdown = headerComponents.UserDropdown;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      curQuestionData: []
    };
    this.state.getData = new Map(
      location.search.substr(1).split("&").map(s => [s.split("=")[0], decodeURIComponent(s.split("=")[1])])
    );
    if (window.localStorage.jwtToken) this.requestCurQuestionData();
  }

  requestCurQuestionData() {
    let accData = JSON.parse(atob(localStorage.jwtToken.split(".")[1]));
    $.ajax({
      "type": "POST",
      "url": "/api/questions/retrieveByEmail",
      "data": {
        "email": accData.email
      },
      "headers": {
        "Authorization": "Bearer " + window.localStorage.jwtToken
      },
      "success": function(data) {
        // When I get a success message... close the modals.
        //  (DO NOT log in, opens up potential security hole (? NB: Maybe not actually) )
        this.setState({curQuestionData: JSON.parse(data)});
      }.bind(this),
      "error": function(xhr, errorType, error) {
        // Something got messed up. TODO: deal with this in a way tht makes sense
        // console.log("SIGNUP ERROR [", type, "]");
      }.bind(this)
    });
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

    return (
      <div className="app">
        <div className="appContent">
          <Header>
            <UserDropdown username={ accData.given_name } onLogOut={ this.logOut.bind(this) }/>
          </Header>
          <div id="questionContainer">
            <QuestionList questionDataList={ this.state.curQuestionData } />
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
