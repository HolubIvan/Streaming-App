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

  renderAuthButton = () => {
    const { isSignedIn } = this.state;
    switch (isSignedIn) {
      case null:
        return "I dont know";
      case true:
        return "Log out";
      case false:
        return "Log in";

      default:
        return "Hm....";
    }
  };

  onAuthClick = () => {
    const { isSignedIn } = this.state;
    if (isSignedIn) {
      window.gapi.auth2.getAuthInstance().signOut();
      return;
    }
    window.gapi.auth2.getAuthInstance().signIn();
  };

  render() {
    const button = this.renderAuthButton();
    return <button onClick={this.onAuthClick}>{button}</button>;
  }
}

export default GoogleAuth;
