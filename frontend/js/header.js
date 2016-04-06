// require (import) the react and react-dom libraries
let React = require("react"), ReactDOM = require("react-dom");

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1 className="pageHeader">BHS Science Career Center</h1>
        { this.props.children }
        <hr className="headerLine" />
      </header>
    );
  }
}

class UserDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "isDropdownVisible": false
    };
  }

  showDropdown() {
    this.setState({"isDropdownVisible": true});
  }

  hideDropdown() {
    this.setState({"isDropdownVisible": false});
  }

  render() {
    if (!this.state.isDropdownVisible) {
      return (
        <div className="dropdown-mainbutton" onClick={ this.showDropdown.bind(this) }>Hi { this.props.username }! <i className="fa fa-chevron-down"></i></div>
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
  "username": React.PropTypes.string
};

UserDropdown.defaultProps = {
  "username": "Bob" // IDK. Was the first reasonable "default" name I could think of. Feel free to change it.
};

module.exports = {
  "Header": Header,
  "UserDropdown": UserDropdown
};
