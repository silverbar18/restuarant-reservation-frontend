import { Container, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import axios from "axios";
import React, { useState } from "react";
import TimePicker from "@mui/lab/TimePicker";
import { getDate } from "date-fns";

const tables = {
  t1: 5,
  t2: 5,
  t3: 5,
  t4: 5,
  t5: 5,
  t6: 5,
  t7: 5,
  t8: 5,
  t9: 5,
  t10: 5,
  t11: 5,
  t12: 5,
  t13: 5,
  t14: 5,
  t15: 5,
  t16: 5,
  t17: 5,
  t18: 5,
  t19: 5,
  t20: 5,
};
let arrayOfTables = [
  "t1",
  "t2",
  "t3",
  "t4",
  "t5",
  "t6",
  "t7",
  "t8",
  "t9",
  "t10",
  "t11",
  "t12",
  "t13",
  "t14",
  "t15",
  "t16",
  "t17",
  "t18",
  "t19",
  "t20",
];

function convertResponse(tablesTaken) {
  var stringArray = [];
  var str = "";
  for (var i = 0; i < tablesTaken.length; i++) {
    str = "t";
    str = str + tablesTaken[i].toString();
    stringArray.push(str);
  }
  return stringArray;
}

function getTakenTables() {
  var tablesAvailable = [];
  const parameters = {
    params: {
      date: "4/30/1002",
      time: "4:00",
    },
  };
  axios
    .get("http://localhost:8000/getAvailableTables", parameters)
    .then((res) => {
      tablesAvailable = arrayOfTables;
      tablesTaken = res.data.reservation;
      var tablesTaken = convertResponse(tablesTaken);
      for (var i = 0; i < tablesTaken.length; i++) {
        // go through array of tables and remove taken tables
        tablesAvailable = tablesAvailable.filter((ta) => ta !== tablesTaken[i]);
      }

      return tablesAvailable;
    })
    .catch((err) => {
      return [];
    });
}

async function AvailableTables() {
  const takenTables = getTakenTables();
  console.log(takenTables);
  return <div>d</div>;
}

function HomePage() {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const getDate = (date) => {
    console.log(date.getDate());
    return "d";
  };
  return (
    <Container>
      <Row>
        <Col>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Select Date"
              value={date}
              onChange={(newValue) => {
                console.log(newValue);
                setDate(newValue);
                //setSelectedDate(getDate(date))
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Col>
        <Col>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Select Time"
              value={time}
              minutesStep={15}
              onChange={(newValue) => {
                setTime(newValue);
                console.log(time);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Selected Date: {date != null ? date.toDateString() : ""}</p>
          <p>
            Selected Time:{" "}
            {time != null ? time.toTimeString().substring(0, 5) : "lol"}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
              
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
