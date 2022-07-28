import React, {useState, useEffect } from "react";
import axios from 'axios';



export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  function setDay(day) {
    setState({...state, day})
  }

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])


  //spots remaining => find a day function
  function findDay(day) {
    const days = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return days[day]
  }



  //bookinterview function
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

  const interviewDay = findDay(state.day) 
  let day = {
    ...state.days[interviewDay],
    spots: state.days[interviewDay]
    }

  if (!state.appointments[id].interview) {
    day = {
      ...state.days[interviewDay],
      spots: state.days[interviewDay].spots - 1
    }
  }  else {
    day = {
      ...state.days[interviewDay],
    spots: state.days[interviewDay].spots
    }
  }

  let days = state.days
  days[interviewDay] = day;
  
  //put request
  return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview:interview})
  .then(res => {
    setState({...state, appointments, days})
    return res
  })
 }

 //cancel interview
 function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const interviewDay = findDay(state.day)
  const day = {
    ...state.days[interviewDay],
    spots: state.days[interviewDay].spots + 1
  }

  let days = state.days
  days[interviewDay] = day;

  return axios.delete(`http://localhost:8001/api/appointments/${id}`)
  .then(res => {
    setState({...state, appointments, days})
    return res
  })
}

return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}
}