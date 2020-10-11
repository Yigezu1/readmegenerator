const fs = require("fs");
const inquirer = require("inquirer");
const util = require(util);
// array of questions for user
const questions = [
  {
    type: "input",
    message: "What is the title of your project?",
    name: "title",
  },
  {
    type: "input",
    message: "What is the description for your project?",
    name: "description",
  },
  {
    type: "input",
    message: "What are the steps required to install your project?",
    name: "installation",
  },
  {
    type: "input",
    message: "What usage information you want to provide to the users of your project?",
    name: "usage",
  },
  {
    type: "list",
    message: "What is the license type of your project?",
    name: "license",
    choices: ["option1", "option2", "option3", "option4"]
  },
  {
    type: "input",
    message: "What are contribution guidelines for your project?",
    name: "contribution",
  },
  {
    type: "input",
    message: "What are the test instructions for your project?",
    name: "tests",
  },
  {
    type: "input",
    message: "What is your github user name?",
    name: "questions",
  },
  {
    type: "input",
    message: "What is your email address?",
    name: "email",
  },
  {
    type: "input",
    message: "Additional information on how to reachout to you:",
    name: "additional",
  },
];

// function to write README file
function writeToFile(fileName, data) {}

// function to initialize program
function init() {}

// function call to initialize program
init();
