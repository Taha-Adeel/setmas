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
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from '../../AuthContext.js';

function Sidebar({ color, image, routes }) {

  const { userType, setUserType, email, setEmail, name, setName, profileURL, setProfileURL } = useContext(AuthContext);
  function checkAdmin(prop, usertype)
  {
    if(prop.requiresAdmin === true)
    {
      if(usertype === "admin" || usertype === "super")
      {
        return true;
      }
      else{
        return false;
      }
    }
    if(prop.requiresAdmin === false)
    {
      if(usertype === "notLoggedIn" && prop.requiresLogin === true)
      {
        return false;
      }
      else
      {
        return true;
      }
    }
  }

  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")"
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            // href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img src={require("assets/img/IIT_Hyderabad_Insignia.svg.png")} alt="..." />
            </div>
          </a>
          <a className="simple-text" href="https://www.iith.ac.in" style={{textTransform: "none"}}>
            SeTMaS
          </a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              if (checkAdmin(prop, userType) === true)
              {
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              }
              else{
                return null;
              }
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
