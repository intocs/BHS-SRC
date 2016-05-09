// require (import) the react lib
let React = require("react");

// Header - a component which encapsulates the header bar
class Header extends React.Component {
  render() {
    return (
      <header>
        <a href="/"><h1 className="pageHeader">BroncosConnect</h1></a>
        { this.props.children }
        <hr className="headerLine" />
      </header>
    );
  }
}

// UserDropdown - a component which encapsulates dropdown bar for a logged in
//  user
class UserDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "isDropdownVisible": false // A state variable representing whether the dropdown buttons are visible
    };
  }

  // Self-explanatory (not really)
  // TODO: Make the chevron always rotate clockwise (meh)
  // Also all the styling stuff being tacked on to these function is absolutely fine
  //  (Maybe change to using "addClass"/"removeClass" and define the classes for each state in CSS somewhere?)
  showDropdown() {
    this.setState({"isDropdownVisible": true});
    $(".dropdown-mainbutton").css({"background-color": "#A4101A"});
    $(".dropdown-opttablecontainer").css({"transform": "scaleY(1)"});
    $(".dropdown-mainbutton .fa-chevron-down").css({"-webkit-transform": "rotate(180deg)", "-moz-transform": "rotate(180deg)", "transform": "rotate(180deg)"});
  }

  hideDropdown() {
    this.setState({"isDropdownVisible": false});
    $(".dropdown-mainbutton").css({"background-color": "#D0021B"});
    $(".dropdown-opttablecontainer").css({"transform": "scaleY(0)"});
    $(".dropdown-mainbutton .fa-chevron-down").css({"-webkit-transform": "rotate(0deg)", "-moz-transform": "rotate(0deg)", "transform": "rotate(0deg)"});
  }

  render() {

    return (
      <div className="dropdown-mainbutton" onClick={ (this.state.isDropdownVisible ? this.hideDropdown : this.showDropdown).bind(this) }>
        Hi { this.props.username }! <i className="fa fa-chevron-down"></i>
        <div className="dropdown-opttablecontainer">
          <table className="dropdown-opttable"><tbody>
            <tr><td onClick={ function() { if (!this.props.askDisabled) { location.href="/ask"; } }.bind(this) } className={this.props.askDisabled ? "disabled" : ""}>Ask a Question</td></tr>
            <tr><td onClick={ this.props.onLogOut }>Log out</td></tr>
            <tr><td>Thing #2</td></tr>
          </tbody></table>
        </div>
      </div>
    );
  }

}

UserDropdown.propTypes = {
  "username": React.PropTypes.string, // Property representing what the user should be called
  "askDisabled": React.PropTypes.bool
};

UserDropdown.defaultProps = {
  "username": "Bob", // IDK. Was the first reasonable "default" name I could think of. Feel free to change it.
  "askDisabled": true
};

module.exports = {
  "Header": Header,
  "UserDropdown": UserDropdown
};
