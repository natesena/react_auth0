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
                  loginWithRedirect({
                    redirect_uri:
                      window.location.hostname === "localhost"
                        ? "http://localhost:3000"
                        : "https://node-react-auth0-draftjs.herokuapp.com/"
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
