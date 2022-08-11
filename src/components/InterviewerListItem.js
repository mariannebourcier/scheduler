import React from "react";
import "components/InterviewerListItem.scss"; 

const classNames = require("classnames");


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
     onClick={props.setInterviewer}
     >
    <img
      className={imageStyle}
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
    </li>
  )
}