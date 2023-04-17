import React from "react";
import NotificationAlert from "react-notification-alert";
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
  Dropdown
} from "react-bootstrap";



function Book() {
  var test = 0;
  const [roomstate, setRoomState] = React.useState("Default Room");
  const notificationAlertRef = React.useRef(null);  
  const notify = (e, place) => {
    var type = "danger";
    var options = {};
    options = {
      place:place, 
      message: (
        <div>
          <div>
            Hello and you are now welcome to <strong>Joe Biden's Pizza.</strong>
          </div>
        </div>
      ),
      type:type,
      icon:"nc-icon nc-bell-55",
      autoDismiss: 7,
      };
      notificationAlertRef.current.notificationAlert(options);
      e.preventDefault();
    };
  return (
    <>
      <div>
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Book a Request</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Requester Name</label>
                        <Form.Control
                          placeholder="John Doe"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Department</label>
                        <Form.Control
                          placeholder="dept"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          IITH Email Address
                        </label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="7">
                      <Form.Group>
                        <label>Date Of Seminar(dd/mm/yyyy)</label>
                        <Form.Control
                          placeholder="dd/mm/yyyy"
                          type="text"
                        >

                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Start Time</label>
                        <Form.Control
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>End Time </label>
                        <Form.Control
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="5">
                      <Dropdown>
                      <Dropdown.Toggle
                        as={Nav.Link}
                        data-toggle="dropdown"
                        id="dropdown-67443507"
                        variant="default"
                        className="m-0"
                      >
                        
                        <span className="notification">{roomstate}</span>
                        <span className="d-lg-none ml-1">Notification</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => {setRoomState("ALH1");}}>ALH1</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => {setRoomState("CLH2");}}>CLH2</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => console.log("mnc seminar")}>mnc.seminar@iith.ac.in</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => console.log("msme seminar")}>msme.seminar@iith.ac.in</Dropdown.Item>
                      </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Title of the Seminar</label>
                        <Form.Control
                          cols="80"
                          placeholder="Here can be your description"
                          rows="1"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="default"
                    onClick={test==1 ? (e) => e.preventDefault() :(e) => notify(e, "tc")}
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          {/* <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg")}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </>
  );
}

export default Book;
