import React from "react";


import { useState, useRef } from "react";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Dropdown,
  Table
} from "react-bootstrap";
import serialize from "form-serialize";
import { useContext } from "react";
import { AuthContext } from '../AuthContext.js';


function AdminList() {

  const formRef = useRef(null);

  const { userType, setUserType, email, setEmail, name, setName, profileURL, setProfileURL } = useContext(AuthContext);
  function handleRemoval(admininfo) {
    //here we will make a post request to the backend to remove the admin and reload the page 
  }
  function handleTransfer(admininfo){
    //here we will make a post request to the backedn to transfer the super admin powers, what we will also have to do is 
    

    //from here, we set the current user to admin only, to prevent having multiple users that can perform admin actions
    setUserType("admin");
    //window.location.reload();
  }



  function addAdmin (e) {

    // ! here we will make an api call to google people in order to get the name 
    const newadmindata = serialize(e.target, {hash: true, disabled: true});
    console.log(newadmindata);
    console.log("lol"); 

    formRef.current.reset();
    e.preventDefault();

  }
  function getAdminEntry(admininfo, num) {

    function yieldRemoveButton(){
      if(userType === "super")
      {
        return (
          <Button className= "btn-fill btn-danger" onClick={() => handleRemoval(admininfo)}>
            Remove
          </Button>
        )
      }
      else{
        return null;
      }
    }
    function yieldTransferButton(){
      if(userType === "super")
      {
        return (
          <Button className= "btn-fill btn-info" onClick={() => handleTransfer(admininfo)}>
            Transfer Root privileges
          </Button>
        )
      }
      else{
        return null;
      }
    }
    
    return (
      <tr>
        <td>{num+1}</td>
        <td>{admininfo.email}</td>
        <td>{admininfo.isRoot?"Yes":"No"}</td>
        <td>
          {yieldRemoveButton()}
        </td>
        <td>
          {admininfo.isRoot?"":yieldTransferButton()}
        </td>
      </tr>
    );
  };

  function createFormattedAdminList() {
    //here we get the list of the admins as a json object of some kind 

    const admins = [
      {

        email: "admin1@iith.ac.in",
        isRoot: true
      },
      {

        email: "admin2@iith.ac.in",
        isRoot: false
      },
      {

        email: "admin3@iith.ac.in",
        isRoot: false
      },
      {

        email: "admin4@iith.ac.in",
        isRoot: false
      }
    ]
    
    return admins.map(getAdminEntry)
   };

  if(userType !== "notLoggedIn")
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">List of Admins</Card.Title>
                <p className="card-category">
                  These are the registered admins of this service. For any queries, please contact the admin.
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0"></th>
                      <th className="border-0">Email ID</th>
                      <th className="border-0">Root Admin</th>
                      <th className="border-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                      <td>1</td>
                      <td>super admin</td>
                      <td>setmas.admin@iith.ac.in</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>jatin</td>
                      <td>cs20btech11021@iith.ac.in</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>fic room booking</td>
                      <td>fic.roombooking@iith.ac.in</td>
                      <td>No</td>
                    </tr> */}
                    {createFormattedAdminList()}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {
          userType === "super"?
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Add Admin</Card.Title>
                  <p className="card-category">
                    Add a new admin to the service.
                  </p>
                </Card.Header>
                <Card.Body>
                  <Form ref = {formRef} onSubmit={(e) => {addAdmin(e)}}>
                    <Row>
                      <Col md="5">
                        <Form.Group>
                          <label>Email</label>
                          <Form.Control
                            defaultValue=""
                            placeholder="Email"
                            name="email"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="5">
                        <Button
                        className="btn-fill btn-info pull-right"
                        type="submit"
                        variant="default"
                        >
                        Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          :
          null
        }
      </Container>
    </>
  );
}

export default AdminList;