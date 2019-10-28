import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Sidebar(props) {
  const [navClass, toggleVisibility] = useState("nav-sidebar");
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    props.show
      ? toggleVisibility("nav-sidebar nav-sidebar-show")
      : toggleVisibility("nav-sidebar");
  });

  return (
    <div className={navClass}>
      <div className={"sidebar-links-container"}>
        <Link
          to={"/"}
          className={"sidebar-link"}
          onClick={() => {
            props.closeDropdown(false);
          }}
        >
          3D
        </Link>
        <Link
          to={"/posts"}
          className={"sidebar-link"}
          onClick={() => {
            props.closeDropdown(false);
          }}
        >
          Home
        </Link>
        {isAuthenticated &&
          user["http://www.nateapp.comroles"].includes("admin") && (
            <div>
              <Link
                to={"/editor"}
                className={"sidebar-link"}
                onClick={() => {
                  props.closeDropdown(false);
                }}
              >
                Editor
              </Link>
              <Link
                to={"/login"}
                className={"sidebar-link"}
                onClick={() => {
                  props.closeDropdown(false);
                }}
              >
                Logout
              </Link>
            </div>
          )}
        {!isAuthenticated && (
          <Link
            to={"/login"}
            className={"sidebar-link"}
            onClick={() => {
              props.closeDropdown(false);
            }}
          >
            Login
          </Link>
        )}

        <div
          className={"sidebar-link sidebar-close"}
          onClick={() => {
            props.closeDropdown(false);
          }}
        >
          <FontAwesomeIcon
            icon={faTimes}
            style={{ filter: "drop-shadow(0 1px 2px rgba(75,75,75,1))" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
