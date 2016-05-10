let React = require("react"), ReactDOM = require("react-dom");

let questionComponents = require("./fullQuestionComponent"),
    FullQuestionObject = questionComponents.FullQuestionObject,
    testData = require("./testData");

let headerComponents = require("./header"),
    Header = headerComponents.Header,
    UserDropdown = headerComponents.UserDropdown;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      curQuestionData: null
    };
    this.state.getData = new Map(
      location.search.substr(1).split("&").map(s => [s.split("=")[0], decodeURIComponent(s.split("=")[1])])
    );
    if (window.localStorage.jwtToken) this.requestCurQuestionData();
  }

  requestCurQuestionData() {
    $.ajax({
      "type": "POST",
      "url": "/api/questions/retrieveById",
      "data": {
        "id": this.state.getData.get("id")
      },
      "headers": {
        "Authorization": "Bearer " + window.localStorage.jwtToken
      },
      "success": function(data) {
        // When I get a success message... close the modals.
        //  (DO NOT log in, opens up potential security hole (? NB: Maybe not actually) )
        this.setState({curQuestionData: data});
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
            <FullQuestionObject questionData={ this.state.curQuestionData } />
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
