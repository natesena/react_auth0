import React from "react";
import { Link, withRouter } from "react-router-dom";
//withRouter  gives component navigation abilities??
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "../react-auth0-wrapper";

function Navbar(props) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <nav className="nav" style={{ overflow: "hidden" }}>
      <Link to="/posts" className="home-button">
        NateSena
      </Link>
      <FontAwesomeIcon icon={faBars} className={"nav-hamburger"} />
      <div className={"nav-options"}>
        {!isAuthenticated && (
          <button
            onClick={() =>
              loginWithRedirect({ redirect_uri: "http://localhost:3000/" })
            }
          >
            Log in
          </button>
        )}

        {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

        <Link to="/editor" className={"nav-button"}>
          Editor
        </Link>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
