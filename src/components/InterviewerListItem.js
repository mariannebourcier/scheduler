import React from "react";
import "components/InterviewerListItem.scss"; 
import classNames from "classnames";


export default function InterviewerListItem(props) {
  let interviewerStyle = classNames("interviewers__item", {
    "interviewers_item--selected": props.selected,
  })

  let imageStyle = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected,
  })

  return (
    <li
     className={interviewerStyle}
     onClick={() => props.setInterviewer(props.name)}
     >
  <img
    className={imageStyle}
    src={props.avatar}
    alt={props.name}
  />
  {props.name}
</li>
  )
}