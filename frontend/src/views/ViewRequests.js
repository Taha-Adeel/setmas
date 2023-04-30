import React, { useState, useEffect } from "react";
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



function ViewRequests()
{
  const { userType, setUserType, email, setEmail, name, setName, profileURL, setProfileURL } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const backendServerLocation = process.env.REACT_APP_BACKEND_SERVER_LOCATION;

  function generateRequestEntry(request, num) {
    return (
      <tr>
        <td>{num + 1}</td>
        <td>{request.title}</td>
        <td>{request.date} </td>
        <td>{request.start_time}</td>
        <td>{request.end_time}</td>
        <td>{request.room}</td>
        <td>{request.status}</td>
      </tr>
    );
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/user_requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
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
                    <th className="border-0">Date</th>
                    <th className="border-0">Start time</th>
                    <th className="border-0">End time</th>
                    <th className="border-0">Venue</th>
                    <th className="border-0">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
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
                    </tr> */}
                  {
                    data.map(generateRequestEntry)
                  }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}


export default ViewRequests;