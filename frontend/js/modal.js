// require (import) the react and react-dom libraries
let React = require("react"), ReactDOM = require("react-dom");
let ReactCSSTransitionGroup = require("react-addons-css-transition-group");

class Modal extends React.Component {
  render() {

    if (this.props.isOpen) {
      return (
        <ReactCSSTransitionGroup transitionName="modal-anim" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          <div className="modalBlurFilter"></div>
          <div className="modalContainer">
            { this.props.children }
          </div>
        </ReactCSSTransitionGroup>
      );
    } else return (
      <ReactCSSTransitionGroup transitionName="modal-anim" transitionEnterTimeout={300} transitionLeaveTimeout={300} />
    );
  }
}

Modal.propTypes = {
  "isOpen": React.PropTypes.bool
};

Modal.defaultProps = {
  "isOpen": false
};


class LoginModal extends React.Component {
  render() {
    return (
      <Modal isOpen={ this.props.isOpen } ref="internalModal">
        <h1 className="modal-header">Log in</h1>
        <input type="text" className="modal-input" placeholder="Email" />
        <input type="text" className="modal-input" placeholder="Password" />
        <button className="modal-button" onClick={ this.props.onLoggingIn }>Log in</button>
        <hr />
        <h3>Don't have an account?</h3>
        <button className="modal-button" onClick={ this.props.onLoggingIn }>Create student account</button>
      </Modal>
    );
  }
}

LoginModal.propTypes ={
  "isOpen": React.PropTypes.bool,
  "onLoggingIn": React.PropTypes.func
};

LoginModal.defaultProps = {
  "isOpen": false,
  "onLoggingIn": function() {}
};


module.exports = {
  "Modal": Modal,
  "LoginModal": LoginModal
};
