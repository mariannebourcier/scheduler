import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  })
  return (
    <li 
    className = {dayClass}
    onClick = {() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>

  );
}
  // return (
  //   <li onClick={() => props.setDay(props.name)}>
  //     <h2 className="text--regular">{props.name}</h2>
  //     <h3 className="text--light">{props.spots} spots remaining</h3>
  //   </li>
  // );


// export default function Button(props) {
//   const buttonClass = classNames("button", {
//     "button--confirm": props.confirm,
//     "button--danger": props.danger
//   });

//   return (
//     <button
//       className={buttonClass}
//       onClick={props.onClick}
//       disabled={props.disabled}
//     >
//       {props.children}
//     </button>
//   );
// }