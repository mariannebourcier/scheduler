import React from "react";

import { 
  render,
  cleanup,  
  waitForElement, 
  fireEvent, 
  getByText, 
  getByAltText, 
  getAllByTestId, 
  prettyDOM, 
  getByPlaceholderText, 
  queryByText, 
  queryByAltText, 
  queryAllByAltText
} from "@testing-library/react";

import axios from "axios";
import Application from "components/Application";
//import { describe } from "yargs";


beforeEach(() => {
  jest.resetModules();
});

afterEach(cleanup);

//axios.defaults.baseURL = "http://localhost:8001";


describe("Application", () => {
  let container;
  let day;
  let appointments;
  beforeEach(async () => {
    container = render(<Application />).container;
    await waitForElement(() => getByText(container, "Archie Cohen"));
    appointments = getAllByTestId(container, "appointment");
    day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
  });

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    fireEvent.click(getByText(container, "Tuesday"));
    expect(getByText(container, /Leopold Silvers/i)).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    expect(
      getByPlaceholderText(appointment, /Enter student name/i)
    ).toBeInTheDocument();
    fireEvent.change(getByPlaceholderText(appointment, /Enter student name/i), {
      target: {
        value: "Lydia Miller-Jones",
      },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const appointment = appointments.find((app) =>
      queryByText(app, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(
      getByText(
        appointment,
        /Are you sure you would like to delete?/i
      )
    ).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, /Deleting/i)).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, "Add"));

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const appointment = appointments.find((app) =>
      queryByText(app, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    expect(getByText(appointment, "Save")).toBeInTheDocument();
    fireEvent.change(getByPlaceholderText(appointment, /Enter student name/i), {
      target: {
        value: "Lydia Miller-Jones",
      },
    });
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /Saving/i)).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce("Test response - Shows the save error when failing to save an appointment");

    const appointment = appointments.find((app) =>
      queryByText(app, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    expect(getByText(appointment, "Save")).toBeInTheDocument();
    fireEvent.change(getByPlaceholderText(appointment, /Enter student name/i), {
      target: {
        value: "Lydia Miller-Jones",
      },
    });
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /Saving/i)).toBeInTheDocument();
    await waitForElement(() =>
      getByText(appointment, "Could not create appointment")
    );
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce("Test response - Shows the delete error when failing to delete an existing appointment");

    const appointment = appointments.find((app) =>
      queryByText(app, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Confirm")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, /Deleting/i)).toBeInTheDocument();
    await waitForElement(() =>
      getByText(appointment, "Could not cancel appointment")
    );
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();
  });
});

//   it("defaults to Monday and changes the schedule when a new day is selected", async () => {
//     const { getByText } = render(<Application />);
  
//     await waitForElement(() => getByText("Monday"));
//       fireEvent.click(getByText("Tuesday"));
//       expect(getByText("Leopold Silvers")).toBeInTheDocument();
//     });

//     it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
//       const { container, debug } = render(<Application />);
      
//       await waitForElement(() => getByText(container, "Archie Cohen"));
//       const appointments = getAllByTestId(container, "appointment");
//       const appointment = appointments[0];
    
//       fireEvent.click(getByAltText(appointment, "Add"));
    
//       fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
//        target: { value: "Lydia Miller-Jones" }
//       });
    
//       fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
//       fireEvent.click(getByText(appointment, "Save"));
    
//       expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
//       await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
//       expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    
    
//       const day = getAllByTestId(container, "day").find(day => {
//         getByText(day, "Monday")
//         });
    
//       expect(getByText(day, "Monday")).toBeInTheDocument();
//       expect(getByText(day, "no spots remaining")).toBeInTheDocument();    
//     });

//     it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
//       const { container } = render(<Application />);
    
//       await waitForElement(() => getByText(container, "Archie Cohen"));
    
//       const appointment = getAllByTestId(container, "appointment").find(
//         appointment => queryByText(appointment, "Archie Cohen")
//       );
    
//       fireEvent.click(queryByAltText(appointment, "Delete"));
    
//       expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    
//       fireEvent.click(queryByText(appointment, "Confirm"));
    
//       expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
//       await waitForElement(() => getByAltText(appointment, "Add"));
//       const day = getAllByTestId(container, "day").find(day =>
//         queryByText(day, "Monday")
//         );
      
//         expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
//       });

//       it("loads data, edits an interview and keeps the spot remaining for Monday the same", async () => {
//         const { container } = render(<Application />);
      
//         await waitForElement(() => getByText(container, "Archie Cohen"));
      
//         const appointment = getAllByTestId(container, "appointment").find(
//           appointment => queryByText(appointment, "Archie Cohen")
//         );
      
//         fireEvent.click(queryByAltText(appointment, "Edit"));
//         fireEvent.click(queryByAltText(appointment, "Sylvia Palmer"));
//         fireEvent.click(getByText(appointment, "Save"));
      
//         expect(getByText(appointment, "Saving")).toBeInTheDocument();
      
//         await waitForElement(() => getByText(container, "Archie Cohen"));
      
//         expect(getByText(container, "Sylvia Palmer")).toBeInTheDocument();
      
//         const day = getAllByTestId(container, "day").find(day => 
//         queryByText(day, "Monday")
//         );
//         expect(getByText(day, "1 spot remaining"))
//       });
     
//       it("shows the save error when failing to save an appointment", async() => {
//         axios.put.mockRejectedValueOnce();
//         const { container } = render(<Application />);
//         await waitForElement(() => getByText(container, "Archie Cohen"))
      
//         const appointment = getAllByTestId(container, "appointment").find(
//           appointment => queryByText(appointment, "Archie Cohen")
//         );
      
//         fireEvent.click(queryByAltText(appointment, "Edit"));
//         fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
//         fireEvent.click(getByText(appointment, "Save"));
      
//         await waitForElement(() => getByText(appointment, "Error"));
//         expect(getByText(appointment, "Error")).toBeInTheDocument();
      
//         fireEvent.click(queryByAltText(appointment, "Close"));
      
//         expect(getByText(appointment, "Save")).toBeInTheDocument();
      
//         fireEvent.click(queryByText(appointment, "Cancel"))
      
//         expect(getByText(container, "Archie Cohen")).toBeInTheDocument();
      
//         const day = getAllByTestId(container, "day").find(day =>
//           queryByText(day, "Monday")
//           );
      
//         expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
//         });

//         it("shows the delete error when failing to delete an existing appointment", async () => {
//           axios.delete.mockRejectedValueOnce();
//           const { container } = render(<Application />);
//           await waitForElement(() => getByText(container, "Archie Cohen"));
        
//           const appointment = getAllByTestId(container, "appointment").find(
//             appointment => queryByText(appointment, "Archie Cohen")
//           );
//           fireEvent.click(queryByAltText(appointment, "Delete"))
        
//           expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
        
//           fireEvent.click(queryByText(appointment, "Confirm"))
        
//           expect(getByText(appointment, "Deleting")).toBeInTheDocument();
        
//           await waitForElement(() => getByText(appointment, "Error"));
//           expect(getByText(appointment, "Error")).toBeInTheDocument();
        
//           const day = getAllByTestId(container, "day").find(day =>
//             queryByText(day, "Monday")
//           );
        
//           expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
//           });
// });












