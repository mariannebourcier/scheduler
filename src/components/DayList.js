import React from "react";
import "components/DayListItem.scss";
import DayListItem from "./DayListItem";
//import classNames from "classnames";

export default function DayList(props) {
  const schedule = props.days.map(daySpots => {
    return (
      <DayListItem
      key = {daySpots.id}
      name = {daySpots.name}
      spots = {daySpots.spots}
      selected = {daySpots.name === props.day}
      setDay = {props.setDay} />
    )
    })

return (
  <ul>{schedule}</ul>
)
}