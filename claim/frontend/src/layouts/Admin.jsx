
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import image from "assets/img/full-screen-image-3.jpg";
import { routes, admin_routes } from "routes.js";

var ps;

class DealershipDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      image: image,
      color: "black",
      hasImage: true,
      navbar: false,
      mini: false,
      fixedClasses: "dropdown show-dropdown open"
    };
  }
  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  UNSAFE_componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  componentDidUpdate(e) {
    if (navigator.platform.indexOf("Win") > -1) {
      setTimeout(() => {
        ps.update();
      }, 350);
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
    if (
      window.innerWidth < 993 &&
      e.history.action === "PUSH" &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
  }
  UNSAFE_componentWillMount() {
    if (document.documentElement.className.indexOf("nav-open") !== -1) {
      document.documentElement.classList.toggle("nav-open");
    }
  }
  handleNotificationClick = position => {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
          every web developer.
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  };
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };
  handleNavbarClick = navbar => {
    this.setState({ navbar: navbar });
  };
  handleMiniClick = () => {
    this.setState({ mini: !this.state.mini });
    document.body.classList.toggle("sidebar-mini");
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  
  getRoutes = admin_routes => {
    console.log("admin_routes = ", admin_routes)
    return admin_routes?.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/frontend/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            render={routeProps => (
              <prop.component
                {...routeProps}
                handleClick={this.handleNotificationClick}
              />
            )}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          image={this.state.image}
          color={this.state.color}
          hasImage={this.state.hasImage}
          mini={this.state.mini}
          category="admin"
        />
        <div
          className={
            "main-panel" +
            (this.props.location.pathname === "/maps/full-screen-maps"
              ? " main-panel-maps"
              : "")
          }
          ref="mainPanel"
        >          
          <Switch>{this.getRoutes(admin_routes)}</Switch>
        </div>
      </div>
    );
  }
}

export default DealershipDashboard;
