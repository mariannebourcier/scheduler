# Interview Scheduler

## Project Description

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database. The user is able to create, delete and modify appointments as well as view the entire schedule. This app uses different development and testing environments, such as Storybook, Jest and Cypress. 

## Final Product

!["Screenshot of schedule"](https://github.com/mariannebourcier/scheduler/blob/master/docs/Sched.png?raw=true)
This screenshot shows the appointment schedule. 

!["Screenshot of appointment"](https://github.com/mariannebourcier/scheduler/blob/master/docs/Create.png?raw=true)
This screenshot shows an appointment being created.

!["Screenshot of error"](https://github.com/mariannebourcier/scheduler/blob/master/docs/Error1.png?raw=true)
This screenshot shows an error when the user does not choose an interviewer.

!["Screenshot of delete"](https://github.com/mariannebourcier/scheduler/blob/master/docs/Confirm.png?raw=true)
This screenshot shows the deletion confirmation for an appointment.




## Setup

Install dependencies with `npm install`.


## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress

``` sh
npm run cypress 
```

## Dependencies 

 - Axios
 - Classnames
 - Normalize.css
 - React
 - React-dom
 - React-hooks-testing-library
 - React-scripts
 - Cypress 9.7.0