import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

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
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton = () => {
    const { isSignedIn } = this.state;
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
    const { isSignedIn } = this.state;
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

export default GoogleAuth;
