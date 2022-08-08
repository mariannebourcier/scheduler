import React from "react";

import { render, cleanup,  waitForElement, fireEvent, getByText, getByAltText, getAllByTestId, prettyDOM, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();

  });

it ("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);
  
  await waitForElement(() => getByText(container, "Archie Cohen"));


  const appointments = getAllByTestId(container, "appointment");
  //console.log(prettyDOM(appointments));

  //const appointment = getAllByTestId(container, "appointment")[0];
  const appointment = appointments[0];


  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
   target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
  expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();


  const day = getAllByTestId(container, "day").find(day => {
    queryByText(day, "Monday")
    })
    //console.log(prettyDOM(day));

    expect(getByText(day, "Monday")).toBeInTheDocument();
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  

  console.log(prettyDOM(appointment));

});