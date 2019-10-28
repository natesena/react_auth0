import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Sidebar from "./Sidebar.js";
//withRouter  gives component navigation abilities??
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "../react-auth0-wrapper";

//inspo https://tympanus.net/Development/HeaderEffects/

function Navbar(props) {
  const { isAuthenticated, user } = useAuth0();
  //0 is the starting state
  const [show, slideNav] = useState(false);

  return (
    <div className="nav">
      <nav className="nav-topbar">
        <Link
          to="/posts"
          className="home-button"
          onClick={() => {
            props.activateDropdownBlur(false);
            if (show) {
              slideNav(!show);
            }
          }}
        >
          NateSena
        </Link>
        <FontAwesomeIcon
          icon={faBars}
          className={"nav-hamburger"}
          style={{ filter: "drop-shadow(1px 1px rgba(200,200,200,1))" }}
          onClick={() => {
            props.activateDropdownBlur(!show);
            slideNav(!show);
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
      {/* want to make sidebar move right */}
      <Sidebar
        show={show}
        closeDropdown={visible => {
          console.log("visible: ", visible);
          props.activateDropdownBlur(visible);
          slideNav(visible);
        }}
      />
    </div>
  );
}

export default withRouter(Navbar);
