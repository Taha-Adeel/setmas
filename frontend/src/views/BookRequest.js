import React from "react";
import serialize from "form-serialize";
import NotificationAlert from "react-notification-alert";
import { useState, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from '../AuthContext.js';
// react-bootstrap components
const backendServerLocation = process.env.REACT_APP_BACKEND_SERVER_LOCATION;


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
  
  const notify = (e, place) => {
    //var type = "success";
    var options = {};
    options = {
      place:place, 
      message: (
        <div>
          <div>
             Your request has been submitted successfully.
          </div>
        </div>
      ),
      type:'success',
      icon:"nc-icon nc-check-2",
      autoDismiss: 3.5,
      };
      notificationAlertRef.current.notificationAlert(options);
      //e.preventDefault();
    };
  const errorNotify = (place, msg = "Form is not filled properly. Please check again. Ex: empty fields, or startime < endtime, etc.") => {
    //var type = "success";
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            {msg}
          </div>
        </div>
      ),
      type: 'danger',
      icon: "nc-icon nc-simple-remove",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
    //e.preventDefault();
  };
  function checkForSanity(data, place)
  {
    let flag = true;
    console.log("in check");
    if(!("name" in data)) {
      errorNotify(place, "Name field is empty");
      flag = false ;}
    if(!("dept" in data)) {
      errorNotify(place, "Dept field is empty");
      flag = false ;}
    if (!("email" in data)) {
      errorNotify(place, "Email field is empty");
      flag = false ;
    }
    if (!("details" in data)) {
      errorNotify(place, "Details field is empty");
      flag = false ;
    }
    if (!("title" in data)) {
      errorNotify(place, "Title field is empty");
      flag = false ;
    }
    if (!("date" in data)) {
      errorNotify(place, "Date field is empty");
      flag = false ;
    }
    const currentDate =  new Date();
    let enteredDate = new Date(data.seminardate);
    if(enteredDate < currentDate)
      {
        errorNotify(place, "Date cannot be earlier than today");
        flag = false ;
      }
    if (!("start_time" in data)) {
      errorNotify(place, "Start time field is empty");
      flag = false ;
    }
    if (!("end_time" in data)) {
      errorNotify(place, "End time field is empty");
      flag = false ;
    }
    if (data.start_time >= data.end_time) {
      errorNotify(place, "Start time cannot be earlier than end time");
      flag = false ;
    }
    if (!("room" in data)) {
      errorNotify(place, "Room field is empty");
      flag = false ;
    }
    if (data.room === 'Default Room') {
      errorNotify(place, "Room field is empty, set to default placeholder");
      flag = false ;
    }
    return flag;
  }
  async function handlesubmit(e, place, type) {
        
    e.preventDefault();
    const data = serialize(e.target, { hash: true, disabled: true });
    let appendedData = { ...data, room: roomstate };
    if(!('CSMAIL' in appendedData))
      appendedData = {...appendedData, CSMAIL: false};
    if (!('AIMAIL' in appendedData))
      appendedData = { ...appendedData, AIMAIL: false };
    if (!('hours2' in appendedData))
      appendedData = { ...appendedData, hours2: false };
    if (!('days1' in appendedData))
      appendedData = { ...appendedData, days1: false };

    if(checkForSanity(appendedData, place))
    {
      
      console.log(appendedData);
      console.log("Form will be submitted with the above data");
      formRef.current.reset();
      console.log(`${backendServerLocation}`);
      
      const response = await fetch(`${backendServerLocation}/booking_request`, {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(appendedData)
        }
      );
      const responsedata = await response.json(); 
      console.log("we got the response from the api endpoint");
      if(!response.ok)
      {
        const message = `an error occurred: ${response.status} ${response.statusText}`;
        throw new Error(message);
      }
      console.log("Request went through ");
      console.log(responsedata);


      notify(e, place); //change this to be on success of API call
    }
    else{
      // errorNotify(place, type);
      console.log("Error, data not valid");
    }
    
    handlesubmit().catch(error =>{
      error.message;
    })
    
    
  
    // const isAIChecked = data.AIMAIL === 'on';
    // console.log(isAIChecked.toString());
    // setFormData({ ...data, AIMAIL: isAIChecked.toString() });
    // console.log(formdata);
    // formRef.current.reset();
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
  const { userType, setUserType, email, setEmail, name, setName, profileURL, setProfileURL } = useContext(AuthContext);
  // console.log("name: " + name);
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
                <Card.Title as="h4">Book a request</Card.Title>
                <p className="card-category">
                    This form is for submitting a request for a seminar. It will be reviewed by the admins of the service and accepted if the criteria are satisfied. 
                </p>
              </Card.Header>
              <Card.Body>
                <Form ref = {formRef} onSubmit={(e) => handlesubmit(e, "tc", isGood ? "success" :"danger")}>
                  <Row>
                    <Col className="pr-2" md="4">
                      <Form.Group>
                        <label>Requester Name</label>
                        {/* Get name from logged in user's info */}
                        <Form.Control
                          placeholder="your name"
                          name = "name"
                          defaultValue={name}
                          type="text"
                          disabled
                          readOnly
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-2" md="2">
                      <Form.Group>
                        <label>Department*</label>
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
                          placeholder="your email"
                          defaultValue={email}
                          name="email"
                          type="email"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="7">
                      <Form.Group>
                        <label>Date Of Seminar(dd/mm/yyyy)*</label>
                         <Form.Control
                          name = "date"
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
                        <label>Start Time*</label>
                        <Form.Control
                          name = "start_time"
                          placeholder="hh:mm"
                          type="time"
                        >
                        </Form.Control> 
                        {/* <TimePitescker start="10:00" end="21:00" step={30} /> */}
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>End Time*</label>
                        <Form.Control
                          name = "end_time"
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
                        <label>Title of the Seminar* (in brief)</label>
                        <Form.Control
                          cols="80"
                          placeholder="Here can be your description"
                          rows="1"
                          name="title"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="pb-2">
                    <Col md="12">
                      <Form.Group>
                        <label>Details of the Seminar (Speaker Bio, Topic, Relevant Information etc.)*</label>
                        <Form.Control
                          cols="80"
                          placeholder="Here can be your description"
                          rows="3"
                          name ="details"
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
                          <input type="checkbox" id="cs" name="CSMAIL" value={csCheck}  onChange={(e) => { setCSCheck(e.target.checked) }} />
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
        </Row>
      </Container>
    </>
  );
}

export default Book;
