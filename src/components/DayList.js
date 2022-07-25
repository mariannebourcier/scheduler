import React from "react";
import "components/DayListItem.scss";
import DayListItem from "./DayListItem";
//import classNames from "classnames";

export default function DayList(props) {
  const days = props.days.map(day => {
    return (
      <DayListItem
      key = {day.id}
      selected = {day.name === props.day}
      {...day}
   />
    )
    })

return (
  <ul>{days}</ul>
)
}