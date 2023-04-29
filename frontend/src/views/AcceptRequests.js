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
import { useState, useRef } from "react";

// function handleAccept(num) {
//   // Ideally send the id (in the db that was sent by the backend when queried) to the backend 
//   console.log("Request " + num + " was accepted");
// }




// function getRequestEntry(pendingRequest, num) {
//   return (
//     <>
//       <td>{num}</td>
//       <td>{pendingRequest.name}</td>
//       <td>{pendingRequest.dept}</td>
//       <td>{pendingRequest.email}</td>
//       <td>{pendingRequest.seminardate}</td>
//       <td>{pendingRequest.seminarstart}</td>
//       <td>{pendingRequest.seminarend}</td>
//       <td>{pendingRequest.title}</td>
//       <td>{pendingRequest.desc}</td>
//       <td>{pendingRequest.venue}</td>
//       <td>{mergeMailingLists(pendingRequest)}</td>
//       <td>{mergeRemainders(pendingRequest)}</td>
//       <td>
//         <Button onClick={() => this.superDialog(pendingRequest)}>
//           Accept
//         </Button>
//       </td>
//     </>
//   );
// };

// function createFormattedRequestsList() {
//   //here we get the list of the pending requests as a json object of some kind 

//   const pendingRequests = [
//     {
//       "name": "PRASHANTH SRIRAM S",
//       "dept": "CSE",
//       "email": "cs20btech11039@iith.ac.in",
//       "seminardate": "2023-04-20",
//       "seminarstart": "19:39",
//       "seminarend": "20:41",
//       "title": "On How to book seminars",
//       "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//       "venue": "B115",
//       "CSMAIL": "false",
//       "AIMAIL": "false",
//       "hours2": "true",
//       "day1": "false"
//     },
//     {
//       "name": "John Doe",
//       "dept": "MECH",
//       "email": "me20btech11039@iith.ac.in",
//       "seminardate": "2023-04-2",
//       "seminarstart": "07:39",
//       "seminarend": "20:41",
//       "title": "Nenjam sonnathe",
//       "desc": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//       "venue": "ALH1",
//       "CSMAIL": "false",
//       "AIMAIL": "false",
//       "hours2": "true",
//       "day1": "true"
//     },
//     {
//       "name": "PRASHANTH SRIRAM S",
//       "dept": "adsdf",
//       "email": "cs20btech11039@iith.ac.in",
//       "seminardate": "2023-04-20",
//       "seminarstart": "19:39",
//       "seminarend": "20:41",
//       "title": "Yet another title",
//       "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//       "venue": "CH2",
//       "CSMAIL": "false",
//       "AIMAIL": "false",
//       "hours2": "false",
//       "day1": "false"
//     }
//   ];
//   return pendingRequests.map((pendingRequest, index) => {
//     return (<tr key={index}>{getRequestEntry(pendingRequest, index + 1)}</tr>);
//   });
// };


// function AcceptRequests() {
//   return (
//     <>
//       <Container fluid>
//         <Row>
//           <Col md="12">
//             <Card className="card-plain table-plain-bg">
//               <Card.Header>
//                 <Card.Title as="h4">Your Requests</Card.Title>
//                 <p className="card-category">
//                   Here is a list of all the requests that are pending
//                 </p>
//               </Card.Header>
//               <Card.Body className="table-full-width table-responsive px-0">
//                 <Table className="table-hover">
//                   <thead>
//                     <tr>
//                       <th className="border-0"></th>
//                       <th className="border-0">Requester Name</th>
//                       <th className="border-0">Requester Dept</th>
//                       <th className="border-0">Email</th>
//                       <th className="border-0">Date</th>
//                       <th className="border-0">Start time</th>
//                       <th className="border-0">End time</th>
//                       <th className="border-0">Title</th>
//                       <th className="border-0">Details</th>
//                       <th className="border-0">Venue</th>
//                       {/* For now mailing lists and remainders are not displayed */}
//                       <th className="border-0">Mail</th>
//                       <th className="border-0">Remainders</th>
//                       <th className="border-0">Accept</th>
//                       {/* <th className="border-0">Extra</th> */}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {createFormattedRequestsList()}
//                   </tbody>
//                 </Table>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }

// export default AcceptRequests;

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
  }
  AcceptDialog(pendingRequest) {
    this.dialog.show({
      body: generateDialogBody(pendingRequest),
      bsSize: 'large',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => { console.log('Accept is clicked'); console.log(pendingRequest); })
      ]
    });
  }
  createFormattedRequestsList() {
    //here we get the list of the pending requests as a json object of some kind 

    const pendingRequests = [
      {
        "name": "PRASHANTH SRIRAM S",
        "dept": "CSE",
        "email": "cs20btech11039@iith.ac.in",
        "seminardate": "2023-04-20",
        "seminarstart": "19:39",
        "seminarend": "20:41",
        "title": "On How to book seminars",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "venue": "B115",
        "CSMAIL": "false",
        "AIMAIL": "false",
        "hours2": "true",
        "days1": "false"
      },
      {
        "name": "John Doe",
        "dept": "MECH",
        "email": "me20btech11039@iith.ac.in",
        "seminardate": "2023-04-2",
        "seminarstart": "07:39",
        "seminarend": "20:41",
        "title": "Nenjam sonnathe",
        "desc": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        "venue": "ALH1",
        "CSMAIL": "false",
        "AIMAIL": "false",
        "hours2": "true",
        "days1": "true"
      },
      {
        "name": "PRASHANTH SRIRAM S",
        "dept": "adsdf",
        "email": "cs20btech11039@iith.ac.in",
        "seminardate": "2023-04-20",
        "seminarstart": "19:39",
        "seminarend": "20:41",
        "title": "Yet another title",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "venue": "CH2",
        "CSMAIL": "false",
        "AIMAIL": "false",
        "hours2": "false",
        "days1": "false"
      }
    ];
    return pendingRequests.map((pendingRequest, index) => {
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
      <td>{pendingRequest.seminardate}</td>
      <td>{pendingRequest.seminarstart}</td>
      <td>{pendingRequest.seminarend}</td>
      <td>{pendingRequest.title}</td>
      {/* <td>{pendingRequest.desc}</td> */}
      <td>{pendingRequest.venue}</td>
      {/* <td>{mergeMailingLists(pendingRequest)}</td>
      <td>{mergeRemainders(pendingRequest)}</td> */}
      <td>
        <Button onClick={() => {this.AcceptDialog(pendingRequest)}}>
          Accept
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