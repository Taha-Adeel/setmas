import React from "react";

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
import { useState, useRef } from "react";




function AcceptRequests() {
    const [tableData, setTableData] = useState([
        { id: 1, name: 'John Doe', age: 30 },
        { id: 2, name: 'Jane Doe', age: 25 },
        { id: 3, name: 'Bob Smith', age: 40 },
      ]);

//     function generateTableEntry(request) {
//     return (
//       <tr>
//         <td>{request.name}</td>
//         <td>Dakota Rice</td>
//         <td>$36,738</td>
//         <td>Niger</td>
//         <td>Oud-Turnhout</td>
//       </tr>
//     );
//   }

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
                  Here is a list of all the requests that are pending
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0"></th>
                      <th className="border-0">Requester</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Title</th>
                      <th className="border-0">Date</th>
                      <th className="border-0">Start time</th>
                      <th className="border-0">End time</th>
                      <th className="border-0">Accept</th>
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

export default AcceptRequests;