// require (import) the react and react-dom libraries
let React = require("react"), ReactDOM = require("react-dom");

let Modal = React.createClass({
  getInitialState: function() {
    return {
      "visible": true
    };
  },
  onClose: function() {
    this.setState({
      "visible": false
    });
  },
  render: function() {
    if (this.state.visible) {
      return (
        <div className="modalBlurFilter">
          <div className="modalContainer">
            { this.props.contentGenerator(this.onClose) }
          </div>
        </div>
      );
    } else return null;
  }
});

module.exports = {
  "Modal": Modal
};
