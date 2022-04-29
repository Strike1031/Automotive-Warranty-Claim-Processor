
import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  OverlayTrigger,
  Tooltip,
  FormLabel,
} from "react-bootstrap";
import { Link } from "react-router-dom"
// react component that creates a switch button that changes from on to off mode
import Switch from "react-bootstrap-switch";

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";

import img1 from "assets/img/blog-1.jpg";
import img2 from "assets/img/blog-2.jpg";
import img3 from "assets/img/blog-3.jpg";
import img4 from "assets/img/blog-4.jpg";
import img5 from "assets/img/blog-5.jpg";

class ScheduleListUser extends Component {
  render() {
    const edit = <Tooltip id="edit">Edit Schedule</Tooltip>;
    const remove = <Tooltip id="remove">Remove</Tooltip>;
    const actions = (
      <td className="td-actions">
        <OverlayTrigger placement="top" overlay={edit}>
          <Button simple bsStyle="success" bsSize="xs">
            <i className="fa fa-edit" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={remove}>
          <Button simple bsStyle="danger" bsSize="xs">
            <i className="fa fa-times" />
          </Button>
        </OverlayTrigger>
      </td>
    );
    return (
      <div className="main-content">
        <Container fluid>
          <div className="d-flex">
            <FormLabel className="mx-auto h1 "><b>Schedule List</b></FormLabel>
          </div>
          <Row>
            <Col md={{ span: 8, offset: 2 }} sm={{ span: 12 }}>
              <Card
                tableFullWidth
                textCenter
                content={
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Collection Name</th>
                        <th>Start Time</th>
                        <th>Due</th>
                        <th>Collect</th>
                        <th>Action</th>                       
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Andrew Mike</td>
                        <td>03:33</td>
                        <td>04:44</td>
                        <td>04:55 - 05:20</td>
                        <td>
                          <Link>Collect</Link>
                        </td>
                      </tr>
                      <tr>
                        <td>John Doe</td>
                        <td>03:33</td>
                        <td>04:44</td>
                        <td>04:55 - 05:20</td>
                        <td>
                          <Link>Collect</Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Alex Mike</td>
                        <td>03:33</td>
                        <td>04:44</td>
                        <td>04:55 - 05:20</td>
                        <td>
                          <Link>Collect</Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Mike Monday</td>
                        <td>03:33</td>
                        <td>04:44</td>
                        <td>04:55 - 05:20</td>
                        <td>
                          <Link>Collect</Link>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ScheduleListUser;
