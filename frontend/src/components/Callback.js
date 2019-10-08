import React, { Component } from "react";
import { withRouter } from "react-router-dom";

//documentation found at https://auth0.com/docs/libraries/auth0js/v9

class Callback extends Component {
  async componentDidMount() {
    this.props.history.replace("/");
  }

  render() {
    return <p>Loading profile...</p>;
  }
}

export default withRouter(Callback);
