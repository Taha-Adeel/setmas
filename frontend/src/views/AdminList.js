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
import { useContext } from "react";
import { AuthContext } from '../AuthContext.js';

function AdminList() {

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
        <td>{num}</td>
        <td>{admininfo.name}</td>
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
        name: "admin1",
        email: "admin1@iith.ac.in",
        isRoot: true
      },
      {
        name: "admin2",
        email: "admin2@iith.ac.in",
        isRoot: false
      },
      {
        name: "admin3",
        email: "admin3@iith.ac.in",
        isRoot: false
      },
      {
        name: "admin4",
        email: "admin4@gmail.com",
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
                      <th className="border-0">Name</th>
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
      </Container>
    </>
  );
}

export default AdminList;