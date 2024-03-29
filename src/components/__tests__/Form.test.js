import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";


afterEach(cleanup);



describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter student name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });


  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
  
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/Student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("validates that the interviewer cannot be null", () => {
    const onSave = jest.fn();
  
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} name="Lydia Miller-Jones" />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/Please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
//failing test
  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1}/>
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter student name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/Student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
  
  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Miller-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter student name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter student name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
 
});