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
  createAuth0Client({
    domain: "nsena.auth0.com",
    client_id: "eGMRjroJZpn8MlzshPcSXhqpQAK8iGlp",
    redirect_uri: "http://localhost:3000/callback",
    scope: "openid profile email app_metadata" //need to ask for app_metadata to get it
  })
    .then(auth0 => {
      console.log(`we got an auth0 Context: ${auth0} `);
      //this.auth0client = auth0
    })
    .catch(err => {
      console.log(`got an error instead of an auth0 context`);
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
