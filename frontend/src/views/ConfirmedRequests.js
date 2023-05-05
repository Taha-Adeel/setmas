import React, { Component } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Dialog from 'react-bootstrap-dialog';
import { servicesVersion } from "typescript";
import { useState, useRef, useEffect } from "react";

// function handleAccept(num) {
//   // Ideally send the id (in the db that was sent by the backend when queried) to the backend 
//   console.log("Request " + num + " was accepted");
// }

function generateDialogBody(confirmedRequest) {
  let str = 'Are you sure you want to cancel this request?\n';
  str += JSON.stringify(confirmedRequest, null, '\n')
  return str;
}

export default class ConfirmRequestsClass extends Component {
  constructor() {
    super();
    this.CancelDialog = this.CancelDialog.bind(this);
    this.createFormattedRequestsList = this.createFormattedRequestsList.bind(this);
    this.getRequestEntry = this.getRequestEntry.bind(this);
    this.state = {data: []};
  }
  componentDidMount() {
    //here we get the list of the confirmed requests as a json object of some kind 
    
      fetch("http://127.0.0.1:5000/accepted_requests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({ data });
        })
        .catch((error) => {
          console.error(error);
        });
  }
  CancelDialog(confirmedRequest) {
    this.dialog.show({
      body: generateDialogBody(confirmedRequest),
      bsSize: 'large',
      actions: [
        Dialog.Action(
          'Abort and Close Dialog',
          () => console.log("Abort button clicked"),
        ),
        Dialog.Action(
          'Cancel Approved Request',
          () => { 
            console.log('Cancel is clicked');
            console.log(confirmedRequest);
            fetch(`http://127.0.0.1:5000/cancel_request`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                request_id: confirmedRequest.request_id
              })
            })
              .then(response => response.json())
              .then(dataa => {
                console.log(dataa);
                this.state.data = this.state.data.filter(entry => entry.request_id != confirmedRequest.request_id);
              })
              .catch(error => {
                console.error(error);
              });
            },
          'btn-danger'
        )
      ]
    });
  }
  

    // const confirmedRequests = [
    //   {
    //     "name": "PRASHANTH SRIRAM S",
    //     "dept": "CSE",
    //     "email": "cs20btech11039@iith.ac.in",
    //     "seminardate": "2023-04-20",
    //     "seminarstart": "19:39",
    //     "seminarend": "20:41",
    //     "title": "On How to book seminars",
    //     "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     "venue": "B115",
    //     "CSMAIL": "false",
    //     "AIMAIL": "false",
    //     "hours2": "true",
    //     "days1": "false"
    //   },
    //   {
    //     "name": "John Doe",
    //     "dept": "MECH",
    //     "email": "me20btech11039@iith.ac.in",
    //     "seminardate": "2023-04-2",
    //     "seminarstart": "07:39",
    //     "seminarend": "20:41",
    //     "title": "Nenjam sonnathe",
    //     "desc": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    //     "venue": "ALH1",
    //     "CSMAIL": "false",
    //     "AIMAIL": "false",
    //     "hours2": "true",
    //     "days1": "true"
    //   },
    //   {
    //     "name": "PRASHANTH SRIRAM S",
    //     "dept": "adsdf",
    //     "email": "cs20btech11039@iith.ac.in",
    //     "seminardate": "2023-04-20",
    //     "seminarstart": "19:39",
    //     "seminarend": "20:41",
    //     "title": "Yet another title",
    //     "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     "venue": "CH2",
    //     "CSMAIL": "false",
    //     "AIMAIL": "false",
    //     "hours2": "false",
    //     "days1": "false"
    //   }
    // ];
  createFormattedRequestsList() {
    console.log("data is : " + this.state.data);
    return this.state.data.map((confirmedRequest, index) => {
      return (<tr key={index}>{this.getRequestEntry(confirmedRequest, index + 1)}</tr>);
    });
  }
  getRequestEntry(confirmedRequest, num) {
    return (
      <>
        <td>{num}</td>
        <td>{confirmedRequest.name}</td>
        {/* <td>{confirmedRequest.dept}</td> */}
        <td>{confirmedRequest.email}</td>
        <td>{confirmedRequest.date}</td>
        <td>{confirmedRequest.start_time}</td>
        <td>{confirmedRequest.end_time}</td>
        <td>{confirmedRequest.title}</td>
        {/* <td>{confirmedRequest.desc}</td> */}
        <td>{confirmedRequest.room}</td>
        {/* <td>{mergeMailingLists(confirmedRequest)}</td>
      <td>{mergeRemainders(confirmedRequest)}</td> */}
        <td>
          <Button onClick={() => { this.CancelDialog(confirmedRequest) }}>
            View/Cancel
          </Button>
        </td>
      </>
    );
  }
  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="card-plain table-plain-bg">
                <Card.Header>
                  <Card.Title as="h4">Your Requests</Card.Title>
                  <p className="card-category">
                    Here is a list of all the requests that are confirmed. Click accept on a request to view more details and then confirm the popup dialog
                  </p>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover">
                    <thead>
                      <tr>
                        <th className="border-0"></th>
                        <th className="border-0">Requester Name</th>
                        {/* <th className="border-0">Requester Dept</th> */}
                        <th className="border-0">Email</th>
                        <th className="border-0">Date</th>
                        <th className="border-0">Start time</th>
                        <th className="border-0">End time</th>
                        <th className="border-0">Title</th>
                        {/* <th className="border-0">Details</th> */}
                        <th className="border-0">Venue</th>
                        {/* For now mailing lists and remainders are not displayed */}
                        {/* <th className="border-0">Mail</th>
                        <th className="border-0">Remainders</th> */}
                        <th className="border-0">Cancel</th>
                        {/* <th className="border-0">Extra</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {this.createFormattedRequestsList()}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <div>
          <Dialog ref={(el) => { this.dialog = el }} />
        </div>
      </>
    )
  }
}