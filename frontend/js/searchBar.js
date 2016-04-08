// searchBar.js - contains the searchbar and associated functions

// Require the thing
let React = require("react");

// SearchBar - a class that encapsulates our beautiful searchbar
class SearchBar extends React.Component {

  onKeyPressed(e) {
    let keyCode = e.which || e.keyCode;
    if (keyCode == 13) {
      this.submitSearch();
    }
  }

  submitSearch() {
    this.props.onSearchSubmitted(this.refs.searchInput.value);
  }

  render() {
    return (
      <div className="searchbar-container">
        <table>
          <tbody>
            <tr>
              <td className="searchbar-searchicon"><span className="fa fa-search"></span></td>
              <td><input type="text" ref="searchInput" className="searchbar-input" onKeyDown={ this.onKeyPressed.bind(this) }/></td>
              <td><button className="searchbar-button" onClick={ this.submitSearch.bind(this) }>Search</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

module.exports = {
  "SearchBar": SearchBar
};
