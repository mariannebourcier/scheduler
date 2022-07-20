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

module.expots = { getAppointmentsForDay };