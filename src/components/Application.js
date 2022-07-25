import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import DayListItem from "./DayListItem";
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay , getInterview , matchAppts } from "helpers/selectors";



export default function Application(props) {

  
  // const [ day, setDay ] = useState([]);
  // const [ dayData, setDayData ] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const setDay = day => setState({...state, day});
  //const setDays = days => setState(prev => ({...prev, days }));

  //const appointments = Object.values(appt)
  
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointment = dailyAppointments.map((appt) => {

    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
      key={appt.id} 
      id = {appt.id}
      time = {appt.time}
      interview = {interview}
    />
    )
  });

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
           days={state.days}
           value={state.day}
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

       {appointment}

        <Appointment
        key="last"
        time="5pm"
        />
      </section>
    </main>
  );
}
