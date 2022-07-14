import React from "react";
import "components/InterviewerList.scss"; 
import InterviewerListItem from "./InterviewerListItem";


export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewersPpl => {
    return (
      <InterviewerListItem 
      key={interviewersPpl.id}
      name={interviewersPpl.name}
      avatar={interviewersPpl.avatar}
      selected={interviewersPpl.id === props.interviewer}
      setInterviewer={props.setInterviewer}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">{interviewers}</h4>
      <ul className="interviewers__list"></ul>
    </section>
  )
 
}