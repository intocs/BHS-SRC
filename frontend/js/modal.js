// require (import) the react and react-dom libraries
let React = require("react"), ReactDOM = require("react-dom");

class Modal extends React.Component {
  render() {
    let ReactCSSTransitionGroup = require("react-addons-css-transition-group");
    if (this.props.isOpen) {
      return (
        <ReactCSSTransitionGroup transitionName="modal-anim" transitionEnterTimeout={1500} transitionLeaveTimeout={1500}>
          <div className="modalBlurFilter"></div>
          <div className="modalContainer">
            { this.props.children }
          </div>
        </ReactCSSTransitionGroup>
      );
    } else return (
      <ReactCSSTransitionGroup transitionName="modal-anim" transitionEnterTimeout={1500} transitionLeaveTimeout={1500} />
    );
  }
}

Modal.propTypes = {
  "isOpen": React.PropTypes.bool
};

Modal.defaultProps = {
  "isOpen": false
};

module.exports = {
  "Modal": Modal
};
