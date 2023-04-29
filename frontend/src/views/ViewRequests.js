import React from "react";
import { createContext } from 'react';
import { useContext } from 'react';
import { AuthContext } from "../AuthContext.js";
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
import { servicesVersion } from "typescript";
import { request } from "gaxios";




function ViewRequests() {


    function generateRequestEntry(request, num) {
    return (
      <>
      <tr>
        <td>{num+1}</td>
        <td>{request.title}</td>
        <td>{request.date} </td>
        <td>{request.starttime}</td>
        <td>{request.endtime}</td>
        <td>{request.venue}</td>
        <td>{request.status}</td>
      </tr>
      </>
    );
  }

  function getMyRequests() {
    // ! here we run the get all request to the backend database of requests, queried on the users email
    
    const requests = [
      {
        title: "aksdfa",
        date: "2020-06-07",
        starttime: "10:10",
        endtime: "10:30",
        venue: "ALH1",
        status: "Pending"
      },
      {
        title: "my brain",
        date: "2020-10-10",
        starttime: "22:10",
        endtime: "23:30",
        venue: "ALH2",
        status: "Accepted"
      },
      {
        title: "LMAO",
        date: "2023-06-07",
        starttime: "10:20",
        endtime: "10:59",
        venue: "Auditorium",
        status: "Rejected"
      },
      {
        title: "Where are we in thsi universer",
        date: "2022-12-31",
        starttime: "00:10",
        endtime: "23:30",
        venue: "B114",
        status: "Accepted"
      }
    ];

    return requests.map(generateRequestEntry)
  }

  return (
    <>
      <Container fluid>
        <Row>
          {/* <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Striped Table with Hover</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Salary</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">City</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col> */}
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Your Requests</Card.Title>
                <p className="card-category">
                  Here is a list of all the requests you have made
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0"></th>
                      <th className="border-0">Title</th>
                      <th className="border-0">Date placed</th>
                      <th className="border-0">Date</th>
                      <th className="border-0">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* make this a loop */}
                      <td>1</td>
                      <td>On Biomedical Sensing</td>
                      <td>10-11-2022</td>
                      <td>10-11-2023</td>
                      <td>Pending</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Advances in Auto Encoders</td>
                      <td>11-12-2023</td>
                      <td>11-12-2024</td>
                      <td>Accepted</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Creation of the modern computer keyboard</td>
                      <td>22-10-2021</td>
                      <td>22-10-2024</td>
                      <td>Accepted</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ViewRequests;