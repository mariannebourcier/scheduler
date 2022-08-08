import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import DayListItem from "./DayListItem";
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay , getInterview , matchAppts } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";



export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
    } = useApplicationData();
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  //not right
  const interviewers = getAppointmentsForDay(state, state.day);

//
  const appointment = dailyAppointments.map((appt) => {

    const interview = getInterview(state, appt.interview);

    return (
      <Appointment
      {...appt}
      key={appt.id} 
      interview = {interview}
      interviewers = {interviewers}
      bookInterview = {bookInterview}
      cancelInterview= {cancelInterview}
    />
    )
  });
//


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
           bookInterview={bookInterview}
           cancelInterview={cancelInterview}
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
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      </section>
    </main>
  );
}
