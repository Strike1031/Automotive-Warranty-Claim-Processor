
import React, { Component, useState } from "react";
import {
  Container,
  Row,
  Col,
  FormLabel,
  FormControl,
  Form,
} from "react-bootstrap";
import axios from 'axios';
import Button from "components/CustomButton/CustomButton.jsx";
import Select from 'react-select'
import {connect} from "react-redux"
import { Link } from "react-router-dom"
import FileUpload from "views/Components/FileUpload"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import 'react-notifications/dist/react-notifications'
import { loadFromLocalStorage } from 'redux/reducers/auth'


// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
//   ]

class AddRepairOrder extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      repair_order: null,
      claim_type: null,
      submission_type: null,
      service_advisor: null,
      technician: null,
      selectedFile: null,
      newUserInfo: {
        profileImages: null
      },
      alert: '',
    }
  }

  claim_types = loadFromLocalStorage("claim_types")
  submission_types= loadFromLocalStorage("submission_types")
  service_advisors = loadFromLocalStorage("service_advisors")
  technicians = loadFromLocalStorage("technicians")
  token = loadFromLocalStorage("token");
  dealership = loadFromLocalStorage("user").dealership;

  handleClaimTypeChange = (claim_type) => {
    this.setState({ claim_type });
    console.log(this.state)
    console.log(claim_type)
  }

  handleSubmissionTypeChange = (submission_type) => {
    this.setState({ submission_type });
    console.log(this.state)
    console.log(submission_type)
  }

  handleServiceAdvisorChange = (service_advisor) => {
    this.setState({ service_advisor });
    console.log(this.state)
    console.log(service_advisor)
  }

  handleTechnicianChange = (technician) => {
    this.setState({ technician });
  }

  handleRepairOrderChange = (e) => {
    this.setState({ repair_order: e.target.value});
    console.log("repair_order = ", this.state.repair_order)
  }

  handleUpload = e => {
    e.preventDefault();
    
    let form_data = new FormData();

    const repair_order_ = this.state.repair_order
    if (this.state.repair_order == null || this.state.repair_order != parseInt(this.state.repair_order, 10)) {
      console.log("this.state.repair_order = ", this.state.repair_order)
      console.log("parse = ",  parseInt(this.state.repair_order, 10))
      this.createNotification('error', 'Upload Failed!', 'Please enter correct repair order.')
      return false;
    }
    form_data.append('repair_order', this.state.repair_order);

    try {
      form_data.append('claim_type', this.state.claim_type.value);
    } catch {
      this.createNotification('error', 'Upload Failed!', 'Please select a claim type.')
      return false;
    }
    
    try {
      form_data.append('submission_type', this.state.submission_type.value);
    } catch {
      this.createNotification('error', 'Upload Failed!', 'Please select a submission type.')
      return false;
    }

    try {
      form_data.append('service_advisor', this.state.service_advisor.value);
    } catch {
      this.createNotification('error', 'Upload Failed!', 'Please select a service advisor.')
      return false;
    }

    try {
      form_data.append('technician', this.state.technician.value);
    } catch {
      this.createNotification('error', 'Upload Failed!', 'Please select a technician.')
      return false;
    }

    try {
      form_data.append('pdf', this.state.newUserInfo.profileImages[0], this.state.newUserInfo.profileImages[0].name);
    } catch {
      this.createNotification('error', 'Upload Failed!', 'Please select a pdf file.')
      return false;
    }
    
    
    form_data.append('dealership', this.dealership);
    let url = '/api/claim/claim/';
    axios.post(url, form_data, {
      headers: {
        // 'content-type': 'multipart/form-data',
        'Authorization': 'token ' + this.token,
      }
    }).then(res => {
      console.log("Insert Claim ::", res.data);
      this.createNotification('success', 'Upload Success!', '')
      return
    }).catch(err => console.log(err))

  };

  updateUploadedFiles = (files) => {
    this.setState({
      newUserInfo: {
        ...this.state.newUserInfo,
        profileImages: files
      }
    })
  }

  createNotification = (type, title, content) => {
    switch (type) {
      case 'info':
        return NotificationManager.info(content);
      case 'success':
        return NotificationManager.success(content, title);
      case 'warning':
        return NotificationManager.warning(content, title, 3000);
      case 'error':
        return NotificationManager.error(content, title, 5000, () => {
          alert('callback');
        });
    }
  };
 

  render() {
    const { claim_type, submission_type, service_advisor, technician, repair_order } = this.state;
    console.log("$$$$$$$$$$$$$$$$$$$$$ claim_types = ", this.claim_types)
    return (
      <div className="main-content">
        <Container fluid className="repair_order">
            <div className="d-flex">
                <FormLabel className="mx-auto h1 "><b>Add Repair Order</b></FormLabel>
            </div>
            <Row>
                <Col md={{ span: 10, offset: 1}} sm={{ span: 12 }} lg={{ span: 8, offset: 2 }}>
                  <Form onSubmit={this.handleUpload}>
                    <Row>
                        <Col md={{ span:5 }} className="text-right">
                            <FormLabel>Repair Order : </FormLabel>
                        </Col>
                        <Col md={{ span:7 }}>
                            <FormControl placeholder="Enter Repair Order" type="text" value={repair_order} onChange={this.handleRepairOrderChange} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span:5 }} className="text-right">
                            <FormLabel>Claim Type : </FormLabel>
                        </Col>
                        <Col md={{ span:7 }}>
                            <Select options={this.claim_types} value={claim_type} onChange={this.handleClaimTypeChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span:5 }} className="text-right">
                            <FormLabel>Submission Type : </FormLabel>
                        </Col>
                        <Col md={{ span:7 }}>
                            <Select options={this.submission_types} value={submission_type} onChange={this.handleSubmissionTypeChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span:5 }} className="text-right">
                            <FormLabel>Service Advisor : </FormLabel>
                        </Col>
                        <Col md={{ span:7 }}>
                            <Select options={this.service_advisors} value={service_advisor} onChange={this.handleServiceAdvisorChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span:5 }} className="text-right">
                            <FormLabel>Technician : </FormLabel>
                        </Col>
                        <Col md={{ span:7 }}>
                            <Select options={this.technicians} value={technician} onChange={this.handleTechnicianChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span:5 }} className="text-right">
                            <FormLabel>Claim PDF : </FormLabel>
                        </Col>
                        <Col md={{ span:7 }}>
                          <FileUpload
                            accept=".pdf"
                            // multiple
                            updateFilesCb={this.updateUploadedFiles}
                          />
                        </Col>
                    </Row>
                    <Row className="mt-0">
                        <Col md={{ span: 3, offset: 3}} className="align-items-center d-flex justify-content-center">
                          <Button variant="primary" className="btn-fill" type="submit">Upload</Button>                            
                        </Col>
                        <Col md={{ span: 3}} className="align-items-center d-flex justify-content-center">
                          <Link to="/frontend/dealership/dashboard" className="mx-auto btn btn-warning btn-fill">Close</Link>
                        </Col>
                    </Row>
                  </Form>
                  <NotificationContainer/>
                </Col>
            </Row>
        </Container>
      </div>
    );
  }
}

export default AddRepairOrder;
