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
import React, { Component } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import { useState, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from '../AuthContext.js';

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";


import sidebarImage from "assets/img/sidebar-4.jpg";
import { get } from "jquery";

function Admin() {
  const {userType, setUserType, email, setEmail, name, setName, profileURL, setProfileURL } = useContext(AuthContext);
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  // console.log(location);
  const mainPanel = React.useRef(null);
  const getRoutes = (routes, userType) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        if(prop.requiresAdmin === false && prop.requiresLogin === false)
          return (
            <Route
              path={prop.layout + prop.path}
              render={(props) => <prop.component {...props} />}
              key={key}
            />
          );
        else if(prop.requiresAdmin === false) // But requires login
        {
          if(['admin', 'super', 'user'].includes(userType))
            return (
              <Route
                path={prop.layout + prop.path}
                render={(props) => <prop.component {...props} />}
                key={key}
              />
            );
          else return null;
        }
        // There is no page that requires login but not admin, so skipping that case
        // case 4 requires admin
        else if(userType === "admin" || userType === "super"){
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
        }
        else{
        return null; 
      }
    }
  });
  };
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutes(routes, userType)}</Switch>
          </div>
          <Footer /> 
        </div>
      </div>
      <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      />
    </>
  );
}

export default Admin;
