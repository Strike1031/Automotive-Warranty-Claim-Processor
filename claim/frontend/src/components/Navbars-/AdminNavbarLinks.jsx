
import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  
  FormGroup,
  FormControl,
  InputGroup
} from "react-bootstrap";

class HeaderLinks extends Component {
  render() {
    return (
      <div>
        <Navbar.Form pullLeft className="navbar-search-form">
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <i className="fa fa-search" />
              </InputGroup.Addon>
              <FormControl type="text" placeholder="Search..." />
            </InputGroup>
          </FormGroup>
        </Navbar.Form>
        <Nav pullRight>
          <NavItem eventKey={3} href="#">
            <i className="fa fa-line-chart" />
            <p>Stats</p>
          </NavItem>
          <NavDropdown
            eventKey={2}
            title={
              <div>
                <i className="fa fa-gavel" />
                <p className="hidden-md hidden-lg">
                  Actions
                  <b className="caret" />
                </p>
              </div>
            }
            noCaret
            id="basic-nav-dropdown-1"
          >
            <Dropdown.Item eventKey={2.1}>Create New Post</Dropdown.Item>
            <Dropdown.Item eventKey={2.2}>Manage Something</Dropdown.Item>
            <Dropdown.Item eventKey={2.3}>Do Nothing</Dropdown.Item>
            <Dropdown.Item eventKey={2.4}>Submit to live</Dropdown.Item>
            <Dropdown.Item divider />
            <Dropdown.Item eventKey={2.5}>Another action</Dropdown.Item>
          </NavDropdown>
          <NavDropdown
            eventKey={3}
            title={
              <div>
                <i className="fa fa-bell-o" />
                <span className="notification">5</span>
                <p className="hidden-md hidden-lg">
                  Notifications
                  <b className="caret" />
                </p>
              </div>
            }
            noCaret
            id="basic-nav-dropdown-2"
          >
            <Dropdown.Item eventKey={3.1}>Notification 1</Dropdown.Item>
            <Dropdown.Item eventKey={3.2}>Notification 2</Dropdown.Item>
            <Dropdown.Item eventKey={3.3}>Notification 3</Dropdown.Item>
            <Dropdown.Item eventKey={3.4}>Notification 4</Dropdown.Item>
            <Dropdown.Item eventKey={3.5}>Another notifications</Dropdown.Item>
          </NavDropdown>
          <NavDropdown
            eventKey={4}
            title={
              <div>
                <i className="fa fa-list" />
                <p className="hidden-md hidden-lg">
                  More
                  <b className="caret" />
                </p>
              </div>
            }
            noCaret
            id="basic-nav-dropdown-3"
            bsClass="dropdown-with-icons dropdown"
          >
            <Dropdown.Item eventKey={4.1}>
              <i className="pe-7s-mail" /> Messages
            </Dropdown.Item>
            <Dropdown.Item eventKey={4.2}>
              <i className="pe-7s-help1" /> Help Center
            </Dropdown.Item>
            <Dropdown.Item eventKey={4.3}>
              <i className="pe-7s-tools" /> Settings
            </Dropdown.Item>
            <Dropdown.Item divider />
            <Dropdown.Item eventKey={4.4}>
              <i className="pe-7s-lock" /> Lock Screen
            </Dropdown.Item>
            <Dropdown.Item eventKey={4.5}>
              <div className="text-danger">
                <i className="pe-7s-close-circle" /> Log out
              </div>
            </Dropdown.Item>
          </NavDropdown>
        </Nav>
      </div>
    );
  }
}
export default HeaderLinks;
