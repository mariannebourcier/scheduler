import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";



const formatSpots = spots => {
  if (!spots) {
    return `no spots remaining`;
  }

  if (spots === 1) {
    return `${spots} spot remaining`;
  }

  return `${spots} spots remaining`;
}

export default function DayListItem({ name, spots, setDay, selected }) {

  const spotsLeft = formatSpots(spots);

  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots
  })
  return (
    <li 
    className = {dayClass}
    onClick = {() => {
      setDay(name);
    }}
    data-testid="day"
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spotsLeft}</h3>
    </li>

  );
}

 