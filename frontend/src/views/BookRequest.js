import React from "react";
import NotificationAlert from "react-notification-alert";
//import TimePicker from 'react-bootstrap-time-picker';
// import DatePicker from 'react-bootstrap-date-picker';
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
  var val = 3;
  const handleChange = (value) => {console.log(value);}
  const [roomstate, setRoomState] = React.useState("Default Room");
  const [csCheck, setCsCheck] = React.useState(false);
  const [aiCheck, setAiCheck] = React.useState(false);
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
                    <Col className="pr-2" md="4">
                      <Form.Group>
                        <label>Requester Name</label>
                        {/* Get name from logged in user's info */}
                        <Form.Control
                          placeholder="John Doe"
                          type="text"
                          disabled
                          readonly
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-2" md="2">
                      <Form.Group>
                        <label>Department</label>
                        <Form.Control
                          placeholder="dept"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-2" md="5">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          IITH Email Address
                        </label>
                        <Form.Control
                          placeholder="johndoe@iith.ac.in"
                          type="email"
                          disabled
                          readonly
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="7">
                      <Form.Group>
                        <label>Date Of Seminar(dd/mm/yyyy)</label>
                         <Form.Control
                          name = "seminar date"
                          placeholder="dd/mm/yyyy"
                          type="date"
                        >
                        </Form.Control> 
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Start Time</label>
                        <Form.Control
                          name = "seminar date"
                          placeholder="hh:mm"
                          type="time"
                        >
                        </Form.Control> 
                        {/* <TimePicker start="10:00" end="21:00" step={30} /> */}
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>End Time</label>
                        <Form.Control
                          name = "seminar date"
                          placeholder="hh:mm"
                          type="time"
                        >
                        </Form.Control> 
                        {/* <TimePicker start="10:00" end="21:00" step={30} /> */}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="7">
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
                        <Dropdown.Item onClick={(e) => {setRoomState("Auditorium");}}>Audi</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => {setRoomState("B115");}}>B115</Dropdown.Item>
                      </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form>
                      {/* <Form.Group> */}
                        {/* <label>Seminar mailing groups to notify</label> */}
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          label="Check this switch"
                        />
                      </Form>
                        {/* <Form.Check
                          type='checkbox'
                          id="cse-check"
                          checked = {!csCheck}
                          onChange = {(e) => {
                            console.log(e);
                            console.log("cLICKED");
                            setCsCheck(!e.target.checked);
                            console.log(csCheck);
                          }}
                          label="CSE"
                        /> */}
                      {/* </Form.Group> */}
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
                  <Row className="pb-2">
                    <Col md="12">
                      <Form.Group>
                        <label>Details of the Seminar (Speaker Bio, Topic, Relevant Information etc.)</label>
                        <Form.Control
                          cols="80"
                          placeholder="Here can be your description"
                          rows="3"
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
                    Submit Request
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
