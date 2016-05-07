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
  showDropdown() {
    this.setState({"isDropdownVisible": true});
    $(".dropdown-mainbutton").css({"background-color": "#A4101A"});
    $(".dropdown-opttablecontainer").css({"transform": "scaleY(1)"});
    $(".fa-chevron-down").css({"-webkit-transform": "rotate(180deg)", "-moz-transform": "rotate(180deg)", "transform": "rotate(180deg)"});
  }

  hideDropdown() {
    this.setState({"isDropdownVisible": false});
    $(".dropdown-mainbutton").css({"background-color": "#D0021B"});
    $(".dropdown-opttablecontainer").css({"transform": "scaleY(0)"});
    $(".fa-chevron-down").css({"-webkit-transform": "rotate(0deg)", "-moz-transform": "rotate(0deg)", "transform": "rotate(0deg)"});
  }
  
  render() {
    // If the dropdown is not currently visible
    if (!this.state.isDropdownVisible) {
      return (
        <div className="dropdown-mainbutton" onClick={ this.showDropdown.bind(this) }>
            Hi { this.props.username }! <i className="fa fa-chevron-down"></i>
          <div className="dropdown-opttablecontainer">
            <table className="dropdown-opttable"><tbody>
                <tr><td onClick={ this.props.onLogOut }>Log out</td></tr>
                <tr><td>Thing #1</td></tr>
                <tr><td>Thing #2</td></tr>
            </tbody></table>
          </div>
        </div>
      );
    } else {
      return (
        <div className="dropdown-mainbutton" onClick={ this.hideDropdown.bind(this) }>
          Hi { this.props.username }! <i className="fa fa-chevron-down"></i>
          <div className="dropdown-opttablecontainer">
            <table className="dropdown-opttable"><tbody>
                <tr><td onClick={ this.props.onLogOut }>Log out</td></tr>
                <tr><td>Thing #1</td></tr>
                <tr><td>Thing #2</td></tr>
            </tbody></table>
          </div>
        </div>
      );
    }
  }
  
}

UserDropdown.propTypes = {
  "username": React.PropTypes.string // Property representing what the user should be called
};

UserDropdown.defaultProps = {
  "username": "Bob" // IDK. Was the first reasonable "default" name I could think of. Feel free to change it.
};

module.exports = {
  "Header": Header,
  "UserDropdown": UserDropdown
};
