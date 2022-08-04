import React from "react";
import "components/InterviewerList.scss"; 
import InterviewerListItem from "./InterviewerListItem";
import classNames from "classnames";
import propTypes from 'prop-types';

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.interviewer}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
 
}


InterviewerList.propTypes = {
  value: propTypes.number,
  onChange: propTypes.func.isRequired
}