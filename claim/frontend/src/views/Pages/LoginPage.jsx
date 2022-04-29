
import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  FormText,
  Form,
} from "react-bootstrap";
import { FormFeedback } from "reactstrap";
import { Link, Redirect } from 'react-router-dom';

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
import { login, getUserInfo, getBasicData } from 'redux/actions/auth.jsx';
import {connect} from "react-redux";
import AuthHelper from 'helpers/authHelper.jsx';
import {validateEmail} from 'helpers/commonHelper.jsx';
import { saveToLocalStorage, loadFromLocalStorage } from 'redux/reducers/auth'
import axios from 'axios'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden: true,
      errors: {
        email: '',
        password: ''
      }
    };
  }
  redirectURL = ""
  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ cardHidden: false });
      }.bind(this),
      700
    ); 
  }

  handleLogin = e => {
    e.preventDefault();

    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;
    let errors = this.state.errors;
    const queryString = require('query-string');
    let parsed = queryString.parse(this.props.location.search);

    if (email === '') {
      errors.email = 'Email is required';
      this.setState({errors});
      return;
    }

    if (!validateEmail(email)) {
      errors.email = 'Email is invalid.';
      this.setState({errors});
      return;
    }

    if (password === '') {
      errors.password = 'Password is required';
      this.setState({errors});
      return;
    }


    this.props.login(email, password)
      .then(
        async(res) => {
          // saveToLocalStorage("token", )
          const token = loadFromLocalStorage("token");
          const headers = { 
            'Authorization': 'token ' + token,
          };
            
          await axios.get('/api/claim/get_claim_types', {headers})
            .then(res => {
              saveToLocalStorage("claim_types", res.data.claim_types.map(d => ({
                "value" : d.name,
                "label" : d.name
              })))
            })
          await axios.get('/api/claim/get_dealerships', {headers})
            .then(res => {
              console.log("res", res)
              saveToLocalStorage("dealerships", res.data.dealerships)
              console.log("rres.data.dealershipses", res.data.dealerships)
              // this.redirectURL = "/frontend/admin/dashboard/" + res.data.dealerships[0].name
              this.redirectURL = "/frontend/admin/dashboard/blank_dashboard"
              console.log("redirectURL = ", this.redirectURL)
            });
          await axios.get('/api/claim/get_submission_types', {headers})
            .then(res => {
              saveToLocalStorage("submission_types", res.data.submission_types.map(d => ({
                "value" : d.name,
                "label" : d.name
              })))
            });
          await axios.get('/api/claim/get_service_advisors', {headers})
            .then(res => {
              saveToLocalStorage("service_advisors", res.data.service_advisor.map(d => ({
                "value" : d.id,
                "label" : d.name
              })))
            });
          await axios.get('/api/claim/get_technicians', {headers})
            .then(res => {
              saveToLocalStorage("technicians", res.data.technicians.map(d => ({
                "value" : d.id,
                "label" : d.name
              })))
            });
          


          await this.props.get_userinfo()
            .then(
              () => {
                console.log("######## get_userinfo() :: Success");
              }
            ).catch(
              err => {
                console.log("Get UserInfo Error");
              }

            );
          
        }
      ).catch(err => {
        console.log("Login Error:::");
        console.log(err.response);
      });

    
  };

  handleChangeInput = e => {
    let errors = this.state.errors;
    if (errors[e.target.name] !== '') {
      errors[e.target.name] = '';
      this.setState(errors); 
    }
  };

  
  render() {
    if (this.props.isAuthenticated) {
      if (this.props.isSuperAdmin) {
        return (
          <Redirect to={this.redirectURL}/>
        );
      } else {
        return (
          <Redirect to='/frontend/dealership/dashboard'/>
        )
      }
    } else {
      let {errors} = this.state;
      return (
        <Container className="container_login">
          <Row>
            <Col md={{ span: 4, offset: 4 }} sm={{ span: 6, offset: 3 }}>
              <Form onSubmit={this.handleLogin}>
                <Card
                  hidden={this.state.cardHidden}
                  textCenter
                  title="Login"
                  content={
                    <div>
                      <FormGroup>
                        <FormLabel>Email address</FormLabel>
                        <FormControl placeholder="Enter email" type="email" name="email"  onChange={this.handleChangeInput}/>
                        <FormFeedback className="text-danger">{errors.email}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Password</FormLabel>
                        <FormControl placeholder="Password" type="password" name="password" autoComplete="off"/>
                      </FormGroup>
                    </div>
                  }
                  legend={
                    <FormGroup>
                      <Button variant="primary" fill wd type="submit">
                        Login
                      </Button>
                      {/* <FormText className="text-dark">Don't you have an account? <Link to="/frontend/auth/register-page"> Register</Link></FormText> */}
                    </FormGroup>
                  }
                  ftTextCenter
                />
              </Form>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => ({
  isAuthenticated: AuthHelper.isAuthenticated(),
  isSuperAdmin: AuthHelper.isSuperAdmin(),
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(login(username, password)),
  get_userinfo: () => dispatch(getUserInfo()),
  // get_basic_data: () => dispatch(getBasicData()),
});



export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
