import { useState, useEffect, useReducer } from "react";
import axios from 'axios';
// import reducer, {
//   SET_DAY,
//   SET_APPLICATION_DATA,
//   SET_INTERVIEW
// } from "reducers/application";

const useApplicationData = () => {
  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({...prev, day}));

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;

      setState(prev => ({...prev, days, appointments, interviewers }));
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
};
}

export default useApplicationData;

// export default function useApplicationData(props) {

//   const [state, dispatch] = useReducer(reducer, {
//     day: "Monday",
//     days: [],
//     appointments: {},
//     interviewers: {}
//   });

//   const setDay = day => dispatch({ type: SET_DAY, day: day });

//   useEffect(() => {
//     Promise.all([
//       axios.get('/api/days'),
//       axios.get('/api/appointments'),
//       axios.get('/api/interviewers')
//     ]).then(all => {
//       dispatch({
//         type: SET_APPLICATION_DATA,
//         days: all[0].data,
//         appointments: all[1].data,
//         interviewers: all[2].data
//     });
//   });
//   }, [])

//   function bookInterview(id, interview) {
//     return axios.put(`/api/appointments/${id}`, { interview }).then( r =>
//       dispatch({
//         type: SET_INTERVIEW,
//         id,
//         interview
//       })
//     );
//   }

//   function cancelInterview(id) {
//     return axios.delete(`/api/appointments/${id}`).then( r =>
//       dispatch({
//         type: SET_INTERVIEW,
//         id,
//         interview: null
//       })
//     );
//   }

//   return {
//     state,
//     setDay,
//     bookInterview,
//     cancelInterview
//   };

// }
