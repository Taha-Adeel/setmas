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
const backendServerLocation = process.env.REACT_APP_BACKEND_SERVER_LOCATION;


function generateDialogBody(pendingRequest) {
  let str = 'Are you sure you want to accept this request?\n';
  str += JSON.stringify(pendingRequest, null, '\n')
  return str;
}

export default class AcceptRequestsClass extends Component {
  constructor() {
    super();
    this.AcceptDialog = this.AcceptDialog.bind(this);
    this.createFormattedRequestsList = this.createFormattedRequestsList.bind(this);
    this.getRequestEntry = this.getRequestEntry.bind(this);
    this.state = {data: []};
  }
  componentDidMount() {
    console.log("Mounting");
    fetch(`http://127.0.0.1:5000/pending_requests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
      })
      .catch(error => {
        console.error(error);
      });
  }
  AcceptDialog(pendingRequest) {
    this.dialog.show({
      body: generateDialogBody(pendingRequest),
      bsSize: 'large',
      actions: [
        Dialog.CancelAction(),
        Dialog.Action(
          'Reject Request',
          () => {
            console.log('Reject is clicked');
            console.log(pendingRequest);
            fetch(`http://127.0.0.1:5000/reject_request`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                request_id: pendingRequest.request_id
              })
            })
              .then(response => response.json())
              .then(dataa => {
                console.log(dataa);
                this.state.data = this.state.data.filter(entry => entry.request_id!=pendingRequest.request_id);
              })
              .catch(error => {
                console.error(error);
              });
          },
          'btn-danger'
        ),
        Dialog.Action(
          "Accept Request",
          () => { 
            console.log('Accept is clicked');
            console.log(pendingRequest);
            fetch(`http://127.0.0.1:5000/accept_request`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                request_id: pendingRequest.request_id
              })
            })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              this.setState(this.state.data.filter(entry => entry.request_id != pendingRequest.request_id));
            })
            .catch(error => {
              console.error(error);
            });
         },
         'btn-primary')
      ]
    });
  }

  createFormattedRequestsList() {
    return this.state.data.map((pendingRequest, index) => {
      return (<tr key={index}>{this.getRequestEntry(pendingRequest, index + 1)}</tr>);
    });
  }
  getRequestEntry(pendingRequest, num) {
    return (
      <>
      <td>{num}</td>
      <td>{pendingRequest.name}</td>
      {/* <td>{pendingRequest.dept}</td> */}
      <td>{pendingRequest.email}</td>
      <td>{pendingRequest.date}</td>
      <td>{pendingRequest.start_time}</td>
      <td>{pendingRequest.end_time}</td>
      <td>{pendingRequest.title}</td>
      {/* <td>{pendingRequest.desc}</td> */}
      <td>{pendingRequest.room}</td>
      {/* <td>{mergeMailingLists(pendingRequest)}</td>
      <td>{mergeRemainders(pendingRequest)}</td> */}
      <td>
        <Button onClick={() => {this.AcceptDialog(pendingRequest)}}>
          Accept/Reject
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
                  <Card.Title as="h4">Pending Requests</Card.Title>
                  <p className="card-category">
                    Here is a list of all the requests that are pending. Click accept on a request to view more details and then confirm the popup dialog
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
                        <th className="border-0">Accept</th>
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