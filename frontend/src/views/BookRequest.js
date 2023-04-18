import React from "react";
import serialize from "form-serialize";
import NotificationAlert from "react-notification-alert";
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
  Dropdown
} from "react-bootstrap";



function Book() {
  const formRef = useRef(null);
  // const [value, setvalue] = useState(),
  //   onInput = ({target:{value}}) => setvalue(value),
  //   onFormSubmit = (e) => {
  //         e.preventDefault()
  //         const isAIChecked = data.get('AIMAIL') === 'on';
  //         setFormData({ ...formdata, AIMAIL: isAIChecked });
  //         console.log(value)
  //         setvalue()
  //       }
  const isGood = false;
  const [formdata, setFormData] = useState({});
  
  const notify = (e, place, typeofnotif) => {
    //var type = "success";
    var type = typeofnotif;
    var options = {};
    options = {
      place:place, 
      message: (
        <div>
          <div>
            Your request has been submitted via <strong>SETMAS.</strong>
          </div>
        </div>
      ),
      type:type,
      icon:"nc-icon nc-check-2",
      autoDismiss: 7,
      };
      notificationAlertRef.current.notificationAlert(options);
      //e.preventDefault();
    };

  function handlesubmit(e, place, type) {
    notify(e, place, type);
    e.preventDefault();
    const data = serialize(e.target, {hash: true});
    const isAIChecked = data.AIMAIL === 'on';
    console.log(isAIChecked.toString());
    setFormData({ ...data, AIMAIL: isAIChecked.toString() });
    console.log(formdata);
    formRef.current.reset();
    //console.log(data)
  }

  var test = 1;
  var val = 3;
  // const handleChange = (value) => {console.log(value);}
  const [roomstate, setRoomState] = React.useState("Default Room");
  const [csCheck, setCSCheck] = React.useState(false);
  const [aiCheck, setAICheck] = React.useState(false);
  const [twoHoursCheck, setTwoHoursCheck] = React.useState(false);
  const [oneDayCheck, setOneDayCheck] = React.useState(false);
  const notificationAlertRef = React.useRef(null);  

    var data = document.getElementById("testform");
    console.log(data);
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
                <Form ref = {formRef} onSubmit={(e) => handlesubmit(e, "tc", isGood ? "success" :"danger")}>
                  <Row>
                    <Col className="pr-2" md="4">
                      <Form.Group>
                        <label>Requester Name</label>
                        {/* Get name from logged in user's info */}
                        <Form.Control
                          placeholder="John Doe"
                          name = "name"
                          type="text"
                          disabled
                          readOnly
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-2" md="2">
                      <Form.Group>
                        <label>Department</label>
                        <Form.Control
                          name = "dept"
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
                          name="email"
                          type="email"
                          disabled
                          readOnly
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="7">
                      <Form.Group>
                        <label>Date Of Seminar(dd/mm/yyyy)</label>
                         <Form.Control
                          name = "seminardate"
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
                          name = "seminarstart"
                          placeholder="hh:mm"
                          type="time"
                        >
                        </Form.Control> 
                        {/* <TimePitescker start="10:00" end="21:00" step={30} /> */}
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>End Time</label>
                        <Form.Control
                          name = "seminarend"
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
                        name="room"
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
                      <Form.Group>
                        <label>Title of the Seminar</label>
                        <Form.Control
                          cols="80"
                          placeholder="Here can be your description"
                          rows="1"
                          name="description"
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
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Seminar Mailing lists to Notify</label> <br />
                        <label>
                          <input type="checkbox" id="cs" name="CSMAIL" value={csCheck} defaultChecked={"false"} onChange={(e) => { setCSCheck(e.target.checked) }} />
                          CSE
                        </label>
                        <br />
                        <label>
                          <input type="checkbox" id="ai" name="AIMAIL" value={aiCheck} onChange={(e) => { setAICheck(e.target.checked) }} />
                          AI
                        </label>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Times to set Reminder for</label> <br />
                        <label>
                          <input type="checkbox" id="twohours" name="hours2" value={twoHoursCheck} onChange={(e) => { setTwoHoursCheck(e.target.checked) }} />
                          2 hours before the start time
                        </label>
                        <br />
                        <label>
                          <input type="checkbox" id="oneday" name="days1" value={oneDayCheck} onChange={(e) => { setOneDayCheck(e.target.checked) }} />
                          A day before the start time
                        </label>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="default"
                    // onClick={test==1 ? (e) => {console.log(e.target); e.preventDefault()} :(e) => notify(e, "tc")}
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
