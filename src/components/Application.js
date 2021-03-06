import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import DayListItem from "./DayListItem";
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";

const appt = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};




export default function Application(props) {

  
  const [ day, setDay ] = useState([]);
  const [ dayData, setDayData ] = useState([]);
  const appointments = Object.values(appt)
  
  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
    .then(res => {
      setDayData(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
           days={dayData}
           value={day}
           onChange={setDay}
        />
        <DayListItem />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        
      </section>
      <section className="schedule">
        {appointments.map((appointment) => {
          return <Appointment key={appointment.id}
          {...appointment}/>
        })}
        <Appointment
        key="last"
        time="5pm"
        />
      </section>
    </main>
  );
}
