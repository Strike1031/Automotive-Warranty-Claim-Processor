
import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  OverlayTrigger,
  Tooltip,
  FormLabel,
  FormCheck,
} from "react-bootstrap";
import { Link } from "react-router-dom"
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import {connect} from "react-redux"
import axios from 'axios'
import Moment from 'moment';
import { loadFromLocalStorage } from 'redux/reducers/auth'
// import DateTime from "react-intl-datetime-format"

class RepairOrderList extends Component {
  state = {
    claims: []
  }

  // claim_types = loadFromLocalStorage("claim_types")
  // submission_types= loadFromLocalStorage("submission_types")
  // service_advisors = loadFromLocalStorage("service_advisors")
  // technicians = loadFromLocalStorage("technicians")
  token = loadFromLocalStorage("token");
  dealership = loadFromLocalStorage("user").dealership;
  headers = { 
    'Authorization': 'token ' + this.token,
  };

  componentDidMount() {
    this.getClaims();
  }

  getClaims = () => {
    const path = this.props.pathname
    const dealership = path.substring(path.lastIndexOf("/") + 1, path.length)
    axios.get('/api/claim/claim/?dealership=' + dealership, {'headers': this.headers})
        .then(res => {
          const claims = res.data;
          this.setState({ claims });
        });
  }

  handleDownloadPDF = pdf => {
    axios.get('/api/claim/download_pdf?dealership=' + this.dealership + '&pdf=' + pdf, {'headers': this.headers})
      .then(res => {
        console.log("res = ", res)
        console.log("res.data.url = ", res.data.url)
        window.open(res.data.url, "_blank");
        console.log("download: OK");
      })
  }

  handleArchiveClick = (e, index, claim_id) => {
    console.log("api url = ", '/api/claim/change_archive/' + claim_id + '?archive=' + (e.target.checked?'1':'0'))
    axios.get('/api/claim/change_archive/' + claim_id + '?archive=' + (e.target.checked?'1':'0'), {'headers': this.headers})
      .then(res => {
        console.log("change archive : success")
        this.getClaims()
      }).catch(
        console.log("change archive : false")        
      )
    const list = [...this.state.claims];
    list[index]['archive'] = e.target.checked;
    this.setState({claims: list});
  };

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
    Moment.locale('en');
    return (
      <div className="main-content">
        <Container fluid>
          <div className="d-flex">
            <FormLabel className="mx-auto h1 "><b>Repair Order List</b></FormLabel>
          </div>
          <Row>
            <Col md={{ span: 10, offset: 1 }} sm={{ span: 12 }}>
              <Card
                tableFullWidth
                textCenter
                content={
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Repair Order#</th>                        
                        <th>Claim Type</th> 
                        <th>Submission Type</th>
                        <th>Service Advisor</th>
                        <th>Technician</th>
                        <th>Claim PDF</th>
                        <th>Uploaded Date</th>
                        <th>Dealership</th>
                        <th>Archive/Complete</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      { this.state.claims.map((claim, i) => 
                        <tr>
                          <td>{claim.repair_order}</td>
                          <td>{claim.claim_type}</td>
                          <td>{claim.submission_type}</td>
                          <td>{claim.service_advisor}</td>
                          <td>{claim.technician}</td>
                          <td>
                            <Link onClick={() => this.handleDownloadPDF(claim.pdf.substring(claim.pdf.lastIndexOf("/")+1, claim.pdf.length))}>
                              {claim.pdf.substring(claim.pdf.lastIndexOf("/")+1, claim.pdf.length)}                              
                            </Link>
                          </td>
                          <td>{Moment(claim.upload_date).format('MMMM Do YYYY, hh:mm:ss a')}</td>
                          <td>{claim.dealership}</td>
                          <td><FormCheck checked={claim.archive} onClick={e => this.handleArchiveClick(e, i, claim.id)}/></td>
                          {/* {actions} */}
                        </tr>
                      )}
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


// export default RepairOrderList;
const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
});
export default connect(mapStateToProps)(RepairOrderList);