// modal.js - contains the Modal React Component and associated stuff

// Require the stuffs
let React = require("react");
let ReactCSSTransitionGroup = require("react-addons-css-transition-group");

// Modal - a component that encapsulates the HTML of a generic modal dialog
class Modal extends React.Component {

  // When it is being rendered to DOM...
  render() {

    // If the modal is currently open...
    if (this.props.isOpen) {
      return (
        <ReactCSSTransitionGroup
          transitionName="modal-anim"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
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
  "isOpen": React.PropTypes.bool,  // Property that models whether or not this modal is open
  "onClosed": React.PropTypes.func // Event that triggers when this modal is closed.
};

Modal.defaultProps = {
  "isOpen": false,
  "onClosed": function() {}
};

// LoginModal - a component that encapsulates the modal for logging in to the site
class LoginModal extends React.Component {

  // When it is being rendered to DOM...
  render() {
    return (
      <Modal isOpen={ this.props.isOpen } onClosed={ this.props.onClosing }>
        <h1 className="modal-header">Log in</h1>
        <button className="modal-close-button" onClick={ this.props.onClosing } />
        <input type="text" ref="email-input" className="modal-input" placeholder="Email" />
        <input type="password" ref="password-input" className="modal-input" placeholder="Password" />
        <button className="modal-button" onClick={ () => {this.props.onLoggingIn(this.refs["email-input"].value, this.refs["password-input"].value); } }>Log in</button>
        <hr className="modal-hr" />
        <h6 className="modal-subheader">Don't have an account?</h6>
        <button className="modal-button" onClick={ this.props.onSwitchingToSignup }>Create an account</button>
      </Modal>
    );
  }

  componentDidUpdate() {
      if (this.props.isOpen) {
          this.refs["email-input"].focus();
      }
  }
}

LoginModal.propTypes ={
  "isOpen": React.PropTypes.bool,               // Property that models whether or not this modal is open
  "onLoggingIn": React.PropTypes.func,          // Event that triggers when the "Log In" button is pressed
  "onClosing": React.PropTypes.func,            // Event that triggers when the modal is closed without effect
  "onSwitchingToSignup": React.PropTypes.func,  // Event that triggers when the user asks to switch to the signup modal
};

LoginModal.defaultProps = {
  "isOpen": false,
  "onLoggingIn": function() {

  },
  "onClosing": function() {},
  "onSwitchingToSignup": function() {}
};

// SignupModal - a component that encapsulates the modal for signing up a user
class SignupModal extends React.Component {

  // Called when the signup button is called - additional logic to deal with validation here
  onSigningUp() {
    if (this.validate()) {

      let dataDict = {},
          refNames = ["fName", "lName", "email", "pwd", "confPwd"];

      refNames.forEach(n => { dataDict[n] = this.refs[n].value; });

      this.props.onSigningUp(dataDict);
    }
  }

  // Called to validate the form, style things appropriately, and return whether or not everything was OK
  validate() {

    let isValid = true;

    let conditions = {
      "fName":   (elem) => (elem.value !== ""),
      "lName":   (elem) => (elem.value !== ""),
      "email":   (elem) => (elem.value !== "" && /[^\s@]+@[^\s@]+\.[^\s@]+/.test(elem.value)),
      "pwd":     (elem) => (elem.value !== ""),
      "confPwd": (elem) => (elem.value !== "" && elem.value === this.refs.pwd.value)
    };

    for (let ref in conditions) {
      if (conditions[ref](this.refs[ref])) {
        $(this.refs[ref]).removeClass("invalid");
      } else {
        $(this.refs[ref]).addClass("invalid");
        isValid = false;
      }
    }

    return isValid;

  }

  // When it is being rendered to DOM...
  render() {
    return (
      <Modal isOpen={ this.props.isOpen } onClosed={ this.props.onClosing }>
        <h1 className="modal-header">Sign up</h1>
        <button className="modal-close-button" onClick={ this.props.onClosing } />
        <input type="text" className="modal-input" placeholder="Authentication code" ref="authentication-input"/>
        <input type="text" ref="fName" className="modal-input modal-input-first-name" placeholder="First name" />
        <input type="text" ref="lName" className="modal-input modal-input-last-name" placeholder="Last name" />
        <input type="text" ref="email" className="modal-input" placeholder="Email address (non-bsd preferable)" />
        <input type="password" ref="pwd" className="modal-input modal-input-first-name" placeholder="Password" />
        <input type="password" ref="confPwd" className="modal-input modal-input-last-name" placeholder="Confirm password" />
        <button className="modal-button" onClick={ this.onSigningUp.bind(this) }>Sign up</button>
        <hr className="modal-hr" />
        <h6 className="modal-subheader">Have an account?</h6>
        <button className="modal-button" onClick={ this.props.onSwitchingToLogin }>Log in</button>
      </Modal>
    );
  }

  componentDidUpdate() {
      if (this.props.isOpen) {
          this.refs["authentication-input"].focus();
      }
  }

}

SignupModal.propTypes ={
  "isOpen": React.PropTypes.bool,             // Property that models whether or not this modal is open
  "onSigningUp": React.PropTypes.func,        // Event that triggers when the "Sign up" button is pressed
  "onClosing": React.PropTypes.func,          // Event that triggers when the modal is closed without effect
  "onSwitchingToLogin": React.PropTypes.func  // Event that triggers when the user asks to switch to the login modal
};

SignupModal.defaultProps = {
  "isOpen": false,
  "onSigningUp": function() {},
  "onClosing": function() {},
  "onSwitchingToLogin": function() {}
};

// AlumModal - a component that encapsulates the modal for signing up a user
class AlumModal extends React.Component {

  // Called when the signup button is called - additional logic to deal with validation here
  onRegistering() {
    if (this.validate()) {

      let dataDict = {},
          refNames = ["fName", "lName", "email"];

      refNames.forEach(n => { dataDict[n] = this.refs[n].value; });
      this.props.onRegistering(dataDict);
    }
  }

  // Called to validate the form, style things appropriately, and return whether or not everything was OK
  validate() {

    let isValid = true;

    let conditions = {
      "fName":   (elem) => (elem.value !== ""),
      "lName":   (elem) => (elem.value !== ""),
      "email":   (elem) => (elem.value !== "" && /[^\s@]+@[^\s@]+\.[^\s@]+/.test(elem.value)),
    };

    for (let ref in conditions) {
      if (conditions[ref](this.refs[ref])) {
        $(this.refs[ref]).removeClass("invalid");
      } else {
        $(this.refs[ref]).addClass("invalid");
        isValid = false;
      }
    }

    return isValid;

  }

  // When it is being rendered to DOM...
  render() {
    return (
      <Modal isOpen={ this.props.isOpen } onClosed={ this.props.onClosing }>
        <h1 className="modal-header">Add an Alum</h1>
        <button className="modal-close-button" onClick={ this.props.onClosing } />
        <input type="text" ref="fName" className="modal-input modal-input-first-name" placeholder="First name" />
        <input type="text" ref="lName" className="modal-input modal-input-last-name" placeholder="Last name" />
        <input type="text" ref="email" className="modal-input" placeholder="Email address (non-bsd preferable)" />
        <button className="modal-button" onClick={ this.onRegistering.bind(this) }>Register</button>
      </Modal>
    );
  }

  componentDidUpdate() {
      if (this.props.isOpen) {
          this.refs.fName.focus();
      }
  }

}

AlumModal.propTypes ={
  "isOpen": React.PropTypes.bool,             // Property that models whether or not this modal is open
  "onClosing": React.PropTypes.func,          // Event that triggers when the modal is closed without effect
  "onRegistering": React.PropTypes.func
};

AlumModal.defaultProps = {
  "isOpen": false,
  "onClosing": function() {},
  "onRegistering": function() {}
};

// Export the things
module.exports = {
  "Modal": Modal,
  "LoginModal": LoginModal,
  "SignupModal": SignupModal,
  "AlumModal": AlumModal
};
