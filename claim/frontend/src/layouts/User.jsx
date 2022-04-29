
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import {routes, admin_routes} from "routes.js";


class UserPages extends Component {
  UNSAFE_componentWillMount() {
    if (document.documentElement.className.indexOf("nav-open") !== -1) {
      document.documentElement.classList.toggle("nav-open");
    }
  }
  getPageClass() {
    var pageClass = "";
    return pageClass;
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/frontend/user") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <div>
        <div className="wrapper wrapper-full-page">
            <div className="content">
              <Switch>{this.getRoutes(routes)}</Switch>
            </div>
          </div>
        </div>
    );
  }
}

export default UserPages;
