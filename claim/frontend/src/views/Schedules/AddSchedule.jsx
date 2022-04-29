
import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  OverlayTrigger,
  Tooltip,
  FormGroup,
  FormLabel,
  FormText,
  FormControl,
  Radio,
  FormCheck,
} from "react-bootstrap";

// react component that creates a switch button that changes from on to off mode
import TimeSelector from "views/Components/TimeSelector";

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";

import img1 from "assets/img/blog-1.jpg";
import img2 from "assets/img/blog-2.jpg";
import img3 from "assets/img/blog-3.jpg";
import img4 from "assets/img/blog-4.jpg";
import img5 from "assets/img/blog-5.jpg";

class AddCollection extends Component {
  render() {
    const view = <Tooltip id="view">View Profile</Tooltip>;
    const edit = <Tooltip id="edit">Edit Profile</Tooltip>;
    const remove = <Tooltip id="remove">Remove</Tooltip>;
    const viewPost = <Tooltip id="view">View Post</Tooltip>;
    const editPost = <Tooltip id="edit">Edit Post</Tooltip>;
    const removePost = <Tooltip id="remove">Remove Post</Tooltip>;
    const actions = (
      <td className="td-actions text-center">
        <OverlayTrigger placement="top" overlay={view}>
          <Button simple bsStyle="info" bsSize="xs">
            <i className="fa fa-user" />
          </Button>
        </OverlayTrigger>
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
    const actionsPost = (
      <td className="td-actions">
        <OverlayTrigger placement="left" overlay={viewPost}>
          <Button simple icon bsStyle="info">
            <i className="fa fa-image" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="left" overlay={editPost}>
          <Button simple icon bsStyle="success">
            <i className="fa fa-edit" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="left" overlay={removePost}>
          <Button simple icon bsStyle="danger">
            <i className="fa fa-times" />
          </Button>
        </OverlayTrigger>
      </td>
    );
    return (
      <div className="main-content">
        <Container fluid>
            <div className="d-flex">
                <FormLabel className="mx-auto h1 "><b>Add Schedule</b></FormLabel>
            </div>
            <Row className="align-items-center mb-4">
                <Col md={{ span: 2, offset: 2 }} sm={{ span: 5 }} className="text-right">
                    <FormLabel>Collection : </FormLabel>
                </Col>
                <Col md={{ span: 5 }} sm={{ span: 7 }}>
                    <FormControl as="select">
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                    </FormControl>
                </Col>
            </Row>            
            <Row>
                <Col md={{ span: 3, offset: 2 }} sm={{ span: 5 }}>
                    <FormCheck inline label="Run Everyday" type="checkbox"/>
                </Col>
            </Row>
            <Row className="d-flex">
                <Row className="mx-auto">
                    <FormText>Select Weekdays : </FormText>
                    <FormCheck inline label="Monday" type="checkbox"/>
                    <FormCheck inline label="Tuesday" type="checkbox"/>
                    <FormCheck inline label="Wendesday" type="checkbox"/>
                    <FormCheck inline label="Thirsday" type="checkbox"/>
                    <FormCheck inline label="Friday" type="checkbox"/>
                    <FormCheck inline label="Saturday" type="checkbox"/>
                    <FormCheck inline label="Sunday" type="checkbox"/>
                </Row>
            </Row>

            <Row>
                <Col md={{ span: 12 }} sm={{ span: 12 }}>
                    <Button variant="info" className="btn-fill">Add New Schedule</Button>
                </Col>
            </Row>
            <Row className="schedule_table">
              <Card
                w_100
                content={
                    <div >
                        <Row className="align-items-center">
                          <Col md={{ span: 11}}>
                            <Row>
                              <Col md={{ span: 3 }} className="text-right">
                                <Row className="align-items-baseline my-0">
                                  <FormLabel>Start Time : </FormLabel>
                                  <TimeSelector/>
                                </Row>
                              </Col>

                              <Col md={{ span: 3 }} className="text-right">
                                <Row className="align-items-baseline my-0">
                                  <FormLabel>Due : </FormLabel>
                                  <TimeSelector/>
                                </Row>
                              </Col>

                              <Col md={{ span: 3 }} className="text-right">
                                <Row className="align-items-baseline my-0">
                                  <FormLabel>Range Start : </FormLabel>
                                  <TimeSelector/>
                                </Row>
                              </Col>

                              <Col md={{ span: 3 }} className="text-right">
                                <Row className="align-items-baseline">
                                  <FormLabel>Range End : </FormLabel>
                                  <TimeSelector/>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                            
                            <Col md={{ span: 1 }} className="justify-content-center d-flex">
                                <Button variant="info" className="btn-fill">Remove</Button>
                            </Col>
                        </Row>

                        <Row className="align-items-center">
                          <Col md={{ span: 11}}>
                            <Row>
                              <Col md={{ span: 3 }} className="text-right">
                                <Row className="align-items-baseline">
                                  <FormLabel>Start Time : </FormLabel>
                                  <TimeSelector/>
                                </Row>
                              </Col>

                              <Col md={{ span: 3 }} className="text-right">
                                <Row className="align-items-baseline">
                                  <FormLabel>Due : </FormLabel>
                                  <TimeSelector/>
                                </Row>
                              </Col>

                              <Col md={{ span: 3 }} className="text-right">
                                <Row className="align-items-baseline">
                                  <FormLabel>Range Start : </FormLabel>
                                  <TimeSelector/>
                                </Row>
                              </Col>

                              <Col md={{ span: 3 }} className="text-right">
                                <Row className="align-items-baseline">
                                  <FormLabel>Range End : </FormLabel>
                                  <TimeSelector/>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                            
                            <Col md={{ span: 1 }} className="justify-content-center d-flex">
                                <Button variant="info" className="btn-fill">Remove</Button>
                            </Col>
                        </Row>

                        <Row className="align-items-center">
                          <Col md={{ span: 11}}>
                            <Row>
                              <Col md={{ span: 3 }} className="text-right">
                                <Row className="align-items-baseline">
                                  <FormLabel>Start Time : </FormLabel>
                                  <TimeSelector/>
                                </Row>
                              </Col>

                              <Col md={{ span: 3 }} className="text-right">
                                <Row className="align-items-baseline">
                                  <FormLabel>Due : </FormLabel>
                                  <TimeSelector/>
                                </Row>
                              </Col>

                              <Col md={{ span: 3 }} className="text-right">
                                <Row className="align-items-baseline">
                                  <FormLabel>Range Start : </FormLabel>
                                  <TimeSelector/>
                                </Row>
                              </Col>

                              <Col md={{ span: 3 }} className="text-right">
                                <Row className="align-items-baseline">
                                  <FormLabel>Range End : </FormLabel>
                                  <TimeSelector/>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                            
                            <Col md={{ span: 1 }} className="justify-content-center d-flex">
                                <Button variant="info" className="btn-fill">Remove</Button>
                            </Col>
                        </Row>
                    </div>
                  }
                  legend={
                      <Row>
                          <Col md={{ span: 2, offset: 4 }} className="d-flex justify-content-center">
                              <Button variant="warning" className="btn-fill">Cancel</Button>
                          </Col>
                          <Col md={{ span: 2}} className="d-flex justify-content-center">
                              <Button variant="primary" className="btn-fill">Save</Button>
                          </Col>
                      </Row>
                  }
              />
            </Row>
        </Container>
      </div>
    );
  }
}

export default AddCollection;
