import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "951546365346-i516ee18rra8ctakupohlbc7gmsh0946.apps.googleusercontent.com",
          scope: "email",
          plugin_name: "streamy",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
      return;
    }
    this.props.signOut();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton = () => {
    const { isSignedIn } = this.props;
    switch (isSignedIn) {
      case null:
        return {
          text: "Loading...",
          className: "ui white google button",
        };
      case true:
        return {
          text: "Log out",
          className: "ui red google button",
        };
      case false:
        return {
          text: "Sign in with Google",
          className: "ui green google button",
        };

      default:
        return {
          text: "Error..",
          className: "ui white google button",
        };
    }
  };

  onAuthClick = () => {
    const { isSignedIn } = this.props;
    if (isSignedIn) {
      this.onSignOutClick();
      return;
    }
    this.onSignInClick();
  };

  render() {
    const button = this.renderAuthButton();
    return (
      <button className={button.className} onClick={this.onAuthClick}>
        <i className="google icon" />
        {button.text}
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
