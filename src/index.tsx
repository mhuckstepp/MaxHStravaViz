import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'

let domain: string
let clientID: string

if (process.env["REACT_APP_AUTH0_DOMAIN"] && process.env["REACT_APP_AUTH0_CLIENTID"]) {
  domain = process.env["REACT_APP_AUTH0_DOMAIN"]
  clientID = process.env["REACT_APP_AUTH0_CLIENTID"]
} else {
  console.log("Auth0 env variables are not set");
  throw new Error("Auth0 env variables are not set")
}

domain = process.env["REACT_APP_AUTH0_DOMAIN"] ?? 'whatever default'

ReactDOM.render(
      <Auth0Provider
      domain={domain}
      clientId={clientID}
      redirectUri={window.location.origin}>
      <App />
      </Auth0Provider>,
  document.getElementById('root')
);
