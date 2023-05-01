import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import GoogleButton from "./GoogleButton";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
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
  Form,
  OverlayTrigger,
  Tooltip,
  Dropdown,
} from "react-bootstrap";



const localizer = momentLocalizer(moment)
// currently 
// const myEventsList = [
//   {
//     'title': 'ALH1: All Day Event very long title',
//     'allDay': true,
//     'start': new Date(2023, 3, 0),
//     'end': new Date(2023, 3, 1),
//     'desc': 'can ya see this'
//   },
//   {
//     'title': 'CLH2: Long Event',
//     'start': new Date(2023, 3, 7),
//     'end': new Date(2023, 3, 10)
//   },

//   {
//     'title': 'B102: DTS STARTS',
//     'start': new Date(2016, 2, 13, 0, 0, 0),
//     'end': new Date(2016, 2, 20, 0, 0, 0)
//   },

//   {
//     'title': 'B102: DTS ENDS',
//     'start': new Date(2016, 10, 6, 0, 0, 0),
//     'end': new Date(2016, 10, 13, 0, 0, 0)
//   },

//   {
//     'title': 'B102: Some Event',
//     'start': new Date(2023, 3, 9, 0, 0, 0),
//     'end': new Date(2023, 3, 9, 0, 0, 0)
//   },
//   {
//     'title': 'B102: Conference',
//     'start': new Date(2023, 3, 11),
//     'end': new Date(2023, 3, 13),
//     desc: 'Big conference for important people'
//   },
//   {
//     'title': 'B102: Meeting',
//     'start': new Date(2023, 3, 12, 10, 30, 0, 0),
//     'end': new Date(2023, 3, 12, 12, 30, 0, 0),
//     desc: 'B102: Pre-meeting meeting, to prepare for the meeting'
//   },
//   {
//     'title': 'Audi: Lunch',
//     'start': new Date(2023, 3, 12, 12, 0, 0, 0),
//     'end': new Date(2023, 3, 12, 13, 0, 0, 0),
//     desc: 'Power lunch'
//   },
//   {
//     'title': 'A520: Meeting',
//     'start': new Date(2023, 3, 12, 14, 0, 0, 0),
//     'end': new Date(2023, 3, 12, 15, 0, 0, 0)
//   },
//   {
//     'title': 'C362: Happy Hour',
//     'start': new Date(2023, 3, 12, 17, 0, 0, 0),
//     'end': new Date(2023, 3, 12, 17, 30, 0, 0),
//     desc: 'Most important meal of the day'
//   },
//   {
//     'title': 'OAT: Dinner',
//     'start': new Date(2023, 3, 12, 20, 0, 0, 0),
//     'end': new Date(2023, 3, 12, 21, 0, 0, 0)
//   },
//   {
//     'title': 'Audi: Birthday Party',
//     'start': new Date(2023, 3, 13, 7, 0, 0),
//     'end': new Date(2023, 3, 13, 10, 30, 0)
//   },
//   {
//     'title': 'B612: Birthday Party 2',
//     'start': new Date(2023, 3, 13, 7, 0, 0),
//     'end': new Date(2023, 3, 13, 10, 30, 0)
//   },
//   {
//     'title': 'B222: Birthday Party 3',
//     'start': new Date(2023, 3, 13, 7, 0, 0),
//     'end': new Date(2023, 3, 13, 10, 30, 0)
//   },
//   {
//     'title': 'C302: Late Night Event',
//     'start': new Date(2023, 3, 17, 19, 30, 0),
//     'end': new Date(2023, 3, 18, 2, 0, 0)
//   },
//   {
//     'title': 'A112: Multi-day Event',
//     'start': new Date(2023, 3, 20, 19, 30, 0),
//     'end': new Date(2023, 3, 22, 2, 0, 0)
//   }
// ];

function CalendarWrapper({eventList, venue}){
  if(venue !=='ALL')
    return (<Calendar
    localizer={localizer}
    events={eventList.filter(event => event.room === venue)}
    startAccessor="start"
    endAccessor="end"
    style={{ height: 500 }}
    />);
  else return (<Calendar
    localizer={localizer}
    events={eventList}
    startAccessor="start"
    endAccessor="end"
    style={{ height: 500 }}
  />);;
}
function wrapEventList(eventList) {
  return eventList.map(event => {
    let eventStartDate = new Date(event.date);
    let eventEndDate = new Date(event.date);
    eventStartDate.setHours(event.start_time.substring(0, 2));
    eventStartDate.setMinutes(event.start_time.substring(3));
    
    eventEndDate.setHours(event.end_time.substring(0, 2));
    eventEndDate.setMinutes(event.end_time.substring(3));
    const newEvent = { ...event, start: eventStartDate, end: eventEndDate };
    console.log("New event is");
    console.log(newEvent);
    return newEvent;
  });
}
function Dashboard() {
  const [roomstate, setRoomState] = useState('ALL');
  const [data, setData] = useState([]);
  const [wrappedData, setWrappedData] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/accepted_requests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log("Data is");
        console.log(data);
        setWrappedData(wrapEventList(data));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">Calendar</Card.Title>
          </Card.Header>
          <Card.Body>
            <label>Select Room </label><Dropdown>
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
                <Dropdown.Item onClick={(e) => { setRoomState("ALL");  }}>All Rooms</Dropdown.Item>
                <Dropdown.Item onClick={(e) => { setRoomState("ALH1"); }}>ALH1</Dropdown.Item>
                <Dropdown.Item onClick={(e) => { setRoomState("A112"); }}>A112</Dropdown.Item>
                <Dropdown.Item onClick={(e) => { setRoomState("B102"); }}>B102</Dropdown.Item>
                <Dropdown.Item onClick={(e) => { setRoomState("CLH2"); }}>CLH2</Dropdown.Item>
                <Dropdown.Item onClick={(e) => { setRoomState("Audi"); }}>Audi</Dropdown.Item>
                <Dropdown.Item onClick={(e) => { setRoomState("B115"); }}>B115</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <CalendarWrapper eventList={wrappedData} venue={roomstate} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Dashboard;
