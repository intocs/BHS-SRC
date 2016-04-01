let React = require("react");

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
