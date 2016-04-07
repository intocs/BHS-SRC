// searchBar.js - contains the searchbar and associated functions

// Require the thing
let React = require("react");

// SearchBar - a class that encapsulates our beautiful searchbar
class SearchBar extends React.Component {
  render() {
    return (
      <div className="searchbar-container">
        <table>
          <tbody>
            <tr>
              <td className="searchbar-searchicon"><span className="fa fa-search"></span></td>
              <td><input type="text" className="searchbar-input"/></td>
              <td><button className="searchbar-button">Search</button></td>
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
