import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
function Sidebar(props) {
  const [navClass, toggleVisibility] = useState("nav-sidebar");

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
          Home
        </Link>
        <Link
          to={"/posts"}
          className={"sidebar-link"}
          onClick={() => {
            props.closeDropdown(false);
          }}
        >
          Posts
        </Link>
        <Link
          to={"/editor"}
          className={"sidebar-link"}
          onClick={() => {
            props.closeDropdown(false);
          }}
        >
          Editor
        </Link>
        <div
          className={"sidebar-close"}
          onClick={() => {
            props.closeDropdown(false);
          }}
        >
          X
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
