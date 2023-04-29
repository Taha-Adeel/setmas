/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import { createContext } from 'react';
import { useContext } from 'react';
import { AuthContext } from "./AuthContext.js";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";


const root = ReactDOM.createRoot(document.getElementById("root"));


function App () {

  const [userType, setUserType] = useState("notLoggedIn");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileURL, setProfileURL] = useState("");

  return (
  <AuthContext.Provider value={{ userType, setUserType, name, setName, email, setEmail, profileURL, setProfileURL }}>
  <GoogleOAuthProvider clientId='49524991744-m0uatjm8tp7b5n8u1ooavi0qfk4avdh9.apps.googleusercontent.com'>
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>
  </GoogleOAuthProvider>
  </AuthContext.Provider> 
  )
}

// root.render(
//   <AuthContext.Provider value={userType}>
//   <GoogleOAuthProvider clientId='49524991744-m0uatjm8tp7b5n8u1ooavi0qfk4avdh9.apps.googleusercontent.com'>
//   <BrowserRouter>
//     <Switch>
//       <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
//       <Redirect from="/" to="/admin/dashboard" />
//     </Switch>
//   </BrowserRouter>
//   </GoogleOAuthProvider>
//   </AuthContext.Provider>  
// );

root.render(
  <App />
)