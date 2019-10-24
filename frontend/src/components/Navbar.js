import React from "react";
import { Link, withRouter } from "react-router-dom";
import Sidebar from "./Sidebar.js";
//withRouter  gives component navigation abilities??
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "../react-auth0-wrapper";

function Navbar(props) {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div>
      <Sidebar />
      <nav className="nav" style={{ overflow: "hidden" }}>
        <Link to="/posts" className="home-button">
          NateSena
        </Link>
        <FontAwesomeIcon
          icon={faBars}
          className={"nav-hamburger"}
          onClick={() => {
            console.log("move right");
          }}
        />
        <div className={"nav-options"}>
          {isAuthenticated &&
            user["http://www.nateapp.comroles"].includes("admin") && (
              <Link to="/editor" className={"nav-button"}>
                Editor
              </Link>
            )}

          {isAuthenticated && (
            <Link to="/profile" className={"nav-button"}>
              Profile
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navbar);
