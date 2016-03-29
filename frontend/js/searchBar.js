let React = require("react");

class SearchBar extends React.Component {
  render() {
    return (
      <div className="searchbar-container">
        <table>
          <tbody>
            <tr>
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
