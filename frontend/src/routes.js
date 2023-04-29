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
import Dashboard from "views/Dashboard.js";
import Book from "views/BookRequest.js";
import AdminList from "views/AdminList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import ViewRequests from "views/ViewRequests.js";
import AcceptRequests from "views/AcceptRequests.js";
import ConfirmedRequests from "views/ConfirmedRequests.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
    requiresAdmin: false,
    requiresLogin: false
  },
  {
    path: "/book",
    name: "Book a Request",
    icon: "nc-icon nc-badge",
    component: Book,
    layout: "/admin",
    requiresAdmin: false,
    requiresLogin: true
  },
  {
    path: "/viewrequests",
    name: "View Requests",
    icon: "nc-icon nc-email-85",
    component: ViewRequests,
    layout: "/admin",
    requiresAdmin: false,
    requiresLogin: true
  },
  {
    path: "/adminlist",
    name: "Admin List",
    icon: "nc-icon nc-notes",
    component: AdminList,
    layout: "/admin",
    requiresAdmin: false,
    requiresLogin: true
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin",
    requiresAdmin: false,
    requiresLogin: true
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
    requiresAdmin: false,
    requiresLogin: true
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
    requiresAdmin: false,
    requiresLogin: true
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
    requiresAdmin: false,
    requiresLogin: true
  },
  {
    path: "/acceptrequests",
    name: "Accept Requests",
    icon: "nc-icon nc-tap-01",
    component: AcceptRequests,
    layout: "/admin",
    requiresAdmin: true,
    requiresLogin: true
  },
  {
  path: "/confirmedrequests",
  name: "Confirmed Requests",
  icon: "nc-icon nc-check-2",
  component: ConfirmedRequests,
  layout: "/admin",
  requiresAdmin: true,
  requiresLogin: true
  }
];

export default dashboardRoutes;
