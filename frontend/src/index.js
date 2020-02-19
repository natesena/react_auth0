import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; //Used to keep UI in sync with URL
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-wrapper";
import config from "./auth_config.json";
import createAuth0Client from "@auth0/auth0-spa-js";

window.addEventListener("load", () => {
  //auth0 and openID connect in general requires a callback address to go upon successful signin
  let callbackRedirectUrl;
  switch (window.location.hostname) {
    case "localhost":
      // code block
      callbackRedirectUrl = "http://localhost:3000/callback";
      break;
    case "node-react-auth0-draftjs.herokuapp.com":
      // code block
      callbackRedirectUrl =
        "https://node-react-auth0-draftjs.herokuapp.com/callback";
      break;
    case "thenewcreative.space":
      // code block
      callbackRedirectUrl = "https://thenewcreative.space/callback";
      break;
  }
  //console.log("Set callbackRedirectUrl: ", callbackRedirectUrl);

  //Scope of auth0Client determines what kind of extra data is sent in requests
  //In our case we need app_metadata to know if the user is privileged to write posts
  createAuth0Client({
    client_id: "eGMRjroJZpn8MlzshPcSXhqpQAK8iGlp",
    display: "popup",
    domain: "nsena.auth0.com",
    max_age: `${60 * 60 * 24}`,
    redirect_uri: callbackRedirectUrl,
    scope: "openid profile email app_metadata",
    prompt: "login"
  })
    .then(auth0 => {
      console.log(`Auth0 Context Received`);
    })
    .catch(err => {
      console.log("Error Creating Auth0 Client: ", err);
    });
});

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    audience={config.audience}
    onRedirectCallback={onRedirectCallback}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
