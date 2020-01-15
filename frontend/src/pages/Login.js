import React from "react";
import { Auth0Context } from "../react-auth0-wrapper";

class Login extends React.Component {
  static contextType = Auth0Context;
  render() {
    const { loginWithRedirect, isAuthenticated, logout } = this.context;
    return (
      <div className={"body-liner"}>
        <div className={"window-table"}>
          <div className={"table-center-row"}>
            <h1 className={"text-center"}>Login Below</h1>
            <p>
              No extended functionality exists for users unless you are
              Nathaniel Sena, the site administrator
            </p>
            {!isAuthenticated && (
              <button
                className={"login-button"}
                onClick={() => {
                  let loginRedirectUrl;
                  switch (window.location.hostname) {
                    case "localhost":
                      // code block
                      loginRedirectUrl = "http://localhost:3000/callback";
                      break;
                    case "node-react-auth0-draftjs.herokuapp.com":
                      // code block
                      loginRedirectUrl =
                        "https://node-react-auth0-draftjs.herokuapp.com/callback";
                      break;
                    case "thenewcreative.space":
                      // code block
                      loginRedirectUrl =
                        "https://thenewcreative.space/callback";
                      break;
                  }
                  console.log("Set loginRedirectUrl: ", loginRedirectUrl);
                  loginWithRedirect({
                    redirect_uri: loginRedirectUrl
                  });
                }}
              >
                Sign In
              </button>
            )}
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                }}
              >
                logout
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
