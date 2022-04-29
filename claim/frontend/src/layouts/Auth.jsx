
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import {routes, admin_routes} from "routes.js";
import bgImage from "assets/img/pexels-lumn-295771.jpg";


class Pages extends Component {
  UNSAFE_componentWillMount() {
    if (document.documentElement.className.indexOf("nav-open") !== -1) {
      document.documentElement.classList.toggle("nav-open");
    }
  }
  getPageClass() {
    var pageClass = "";
    switch (this.props.location.pathname) {
      case "/frontend/auth/login-page":
        pageClass = " login-page";
        break;
      case "/frontend/auth/register-page":
        pageClass = " login-page register-page";
        break;
      case "/frontend/auth/lock-screen-page":
        pageClass = " lock-page";
        break;
      default:
        pageClass = "";
        break;
    }
    return pageClass;
  }
  getRoutes = routes => {
    return routes?.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/frontend/auth") {
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
          <div
            className={"full-page" + this.getPageClass()}
            data-color="black"
            data-image={bgImage}
          >
            <div className="content">
              <Switch>{this.getRoutes(routes)}</Switch>
            </div>
            <div
              className="full-page-background"
              style={{ backgroundImage: "url(" + bgImage + ")" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Pages;
