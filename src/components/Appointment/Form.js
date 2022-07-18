import React, { useState } from "react";
import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList";
import { action } from '@storybook/addon-actions/dist/preview';

export default function Form(props){
  const [currentName, setName] = useState(props.name || "");
  const [currentInterviewer, setInterviewer] = useState(props.value || null)

  const reset = () => {
    setName('')
    setInterviewer('null')
  }

  const cancel = () => {
    reset();
    props.onCancel()
  }


  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name={props.name}
        type="text"
        placeholder={currentName ? currentName: "Please enter your name"}
     
      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers}
      value={currentInterviewer}
      onChange={(event) =>
      setInterviewer(event)}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onSumit={event => event.preventDefault()} onClick={event => props.onSave(currentName, currentInterviewer)}>Save</Button>
    </section>
  </section>
</main>
  )
}