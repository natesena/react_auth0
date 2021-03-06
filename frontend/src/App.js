import React, { useState } from "react";
import "./css/App.css";
import "./css/WYSIWYG.css";
import { Route } from "react-router-dom";

import Welcome from "./pages/Welcome.js";
import Base from "./pages/Base.js";
import Editor from "./pages/Editor.js";
import ShowPost from "./pages/ShowPost.js";
import Login from "./pages/Login.js";

import Callback from "./components/Callback.js";
import Navbar from "./components/Navbar.js";
import Profile from "./components/Profile";
import { useAuth0 } from "./react-auth0-wrapper";

function App() {
  const { loading } = useAuth0();
  const [blur, toggleBlur] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    /* position relative, height: 100vh */
    <div className="App">
      <Navbar
        activateDropdownBlur={dropdownActive => {
          toggleBlur(dropdownActive);
        }}
      />
      <div className={`body${blur ? " blur" : ""}`}>
        {/* Here is where we want to use <Route> and <Switches> */}
        <Route exact path="/" component={Welcome} />
        <Route path="/profile" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/posts" component={Base} />
        {/* <Route path="/posts/:id/edit"  render={Editor} /> */}
        <Route exact path="/posts/:id" component={ShowPost} />
        <Route path="/posts/:id/edit" render={props => <Editor {...props} />} />
        {/* Look Up <Privateroute > */}
        <Route exact path="/editor" component={Editor} />
        <Route exact path="/callback" component={Callback} />
      </div>
    </div>
  );
}

export default App;
