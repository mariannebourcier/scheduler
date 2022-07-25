//appt obj array with id
const matchAppts = (appointments, id) => {
  const matched = id.map(id => appointments[id]);
  return matched;
}

//go through state array with days obj and apt obj
// match appts day to appt obj
function getAppointmentsForDay(state, day) {
  let apptArr = [];
  state.days.map(dayObject => {
    if (dayObject.name === day) {
      dayObject.appointments.forEach(apptId => apptArr.push(apptId))
    }
  })
  return matchAppts(state.appointments, apptArr);
}

function getInterview(state, interview) {
    if (!interview) {
      return null;
    }
 const interviewerData = state.interviewers[interview.interviewer];
 return {
   student: interview.student,
   interviewer: interviewerData
 }
}


function getInterviewersForDay(state, day) {

  let interviewersArr = [];
  state.days.map(dayObject => {
    if (dayObject.name === day) {
      dayObject.interviewers.forEach(interviewerId => interviewersArr.push(interviewerId))
    }
  })
  return matchAppts(state.interviewers, interviewersArr);
}


module.exports = { matchAppts, getAppointmentsForDay, getInterview, getInterviewersForDay };