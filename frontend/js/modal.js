// require (import) the react and react-dom libraries
let React = require("react"), ReactDOM = require("react-dom");
let ReactCSSTransitionGroup = require("react-addons-css-transition-group");


class Modal extends React.Component {
  render() {
    if (this.props.isOpen) {
      return (
        <ReactCSSTransitionGroup transitionName="modal-anim" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          <div className="modalBlurFilter" onClick={ this.props.onClosed }></div>
          <div className="modalContainer">
            { this.props.children }
          </div>
        </ReactCSSTransitionGroup>
      );
    } else 
        return (
        <ReactCSSTransitionGroup transitionName="modal-anim" transitionEnterTimeout={300} transitionLeaveTimeout={300} />
    );
  }
}

Modal.propTypes = {
  "isOpen": React.PropTypes.bool,
  "onClosed": React.PropTypes.func
};

Modal.defaultProps = {
  "isOpen": false,
  "onClosed": function(){}
};


class LoginModal extends React.Component {
  render() {
    return (
      <Modal isOpen={ this.props.isOpen } ref="internalModal" onClosed={ this.props.onClosing }>
        <h1 className="modal-header">Log in</h1>
        <button className="modal-close-button" onClick={ this.props.onClosing } />
        <input type="text" className="modal-input" placeholder="Email" />
        <input type="text" className="modal-input" placeholder="Password" />
        <button className="modal-button" onClick={ this.props.onLoggingIn }>Log in</button>
        <hr className="modal-hr" />
        <h6 className="modal-subheader">Don't have an account?</h6>
        <button className="modal-button" onClick={ this.props.onSwitchingToSignup }>Create an account</button>
      </Modal>
    );
  }
}

LoginModal.propTypes ={
  "isOpen": React.PropTypes.bool,
  "onLoggingIn": React.PropTypes.func,
  "onClosing": React.PropTypes.func,
  "onSwitchingToSignup": React.PropTypes.func,
};

LoginModal.defaultProps = {
  "isOpen": false,
  "onLoggingIn": function() {},
  "onClosing": function() {},
  "onSwitchingToSignup": function() {}
};

class SignupModal extends React.Component {
  render() {
    return (
      <Modal isOpen={ this.props.isOpen } ref="internalModal" onClosed={this.props.onClosing}>
        <h1 className="modal-header">Sign up</h1>
        <button className="modal-close-button" onClick={ this.props.onClosing } />
        <input type="text" className="modal-input" placeholder="Authentication code" />
        <input type="text" className="modal-input modal-input-first-name" placeholder="First name" />
        <input type="text" className="modal-input modal-input-last-name" placeholder="Last name" />
        <input type="text" className="modal-input" placeholder="Email address (non-bsd preferable)" />
        <input type="password" className="modal-input modal-input-first-name" placeholder="Password" />
        <input type="password" className="modal-input modal-input-last-name" placeholder="Confirm password" />
        <button className="modal-button" onClick={ this.props.onSigningUp }>Sign up</button>
        <hr className="modal-hr" />
        <h6 className="modal-subheader">Have an account?</h6>
        <button className="modal-button" onClick={ this.props.onSwitchingToLogin }>Log in</button>
      </Modal>
    );
  }
}

SignupModal.propTypes ={
  "isOpen": React.PropTypes.bool,
  "onSigningUp": React.PropTypes.func,
  "onClosing": React.PropTypes.func,
  "onSwitchingToLogin": React.PropTypes.func
};

SignupModal.defaultProps = {
  "isOpen": false,
  "onSigningUp": function() {},
  "onClosing": function() {},
  "onSwitchingToLogin": function() {}
};


module.exports = {
  "Modal": Modal,
  "LoginModal": LoginModal,
  "SignupModal": SignupModal
};
