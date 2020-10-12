const { info } = require("console");
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown");
const writeFile = util.promisify(fs.writeFile);
const TurndownService = require("turndown");
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
    message:
      "What usage information you want to provide to the users of your project?",
    name: "usage",
  },
  {
    type: "list",
    message: "What is the license type of your project?",
    name: "license",
    choices: ["option1", "option2", "option3", "option4"],
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
    name: "userName",
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
async function writeToFile(fileName, data) {
  try {
    await writeFile(fileName, data);
  } catch {
    throw Error();
  }
}

// function to initialize program
async function init() {
  try {
    const {
      title,
      description,
      installation,
      usage,
      license,
      contribution,
      tests,
      userName,
      email,
      additional,
    } = await inquirer.prompt(questions);
    console.log(title);
    const proInformation = {
      projTitle: {
        title: title,
        type: "Title",
        content: title,
      },
      proDesc: {
        title: "Description",
        content: description,
      },
      proTable: {
        title: "Table of Contents",
      },
      proInstallation: {
        title: "Installation",
        content: installation,
      },
      proUsage: {
        title: "Usage",
        content: usage,
      },
      proLicense: {
        title: "License",
        content: license,
        badge:
          "[![forthebadge](https://forthebadge.com/images/badges/uses-badges.svg)](https://forthebadge.com)",
      },
      proContribution: {
        title: "Contributing",
        content: contribution,
      },

      proTest: {
        title: "Tests",
        content: tests,
      },
      proQuestions: {
        title: "Questions",
        content: userName,
        email: email,
        additional: additional,
      },
    };

    let tableOfContents = "";
    let fileContent = "";
    for (const info in proInformation) {
      if (proInformation[info].content) {
        if (
          !(
            proInformation[info] === proInformation.projTitle ||
            proInformation[info] === proInformation.proDesc
          )
        ) {
        tableOfContents += `
       * [${proInformation[info].title}](#${proInformation[
            info
          ].title.toLowerCase()})
       `;
        }
      }
    }
    console.log(tableOfContents);
    proInformation.projTitle.title = generateMarkdown(proInformation.projTitle);
    proInformation.proDesc.title = generateMarkdown(proInformation.proDesc);
    proInformation.proInstallation.title = generateMarkdown(
      proInformation.proInstallation
    );
    proInformation.proUsage.title = generateMarkdown(proInformation.proUsage);
    proInformation.proLicense.title = generateMarkdown(
      proInformation.proLicense
    );
    proInformation.proContribution.title = generateMarkdown(
      proInformation.proContribution
    );
    proInformation.proTest.title = generateMarkdown(proInformation.proTest);
    proInformation.proQuestions.title = generateMarkdown(
      proInformation.proQuestions
    );
    proInformation.proTable.title = generateMarkdown(proInformation.proTable);
    fileContent = `${proInformation.proLicense.badge}


  ${proInformation.projTitle.title}
  ${proInformation.proDesc.title}
  ${proInformation.proDesc.content}


  ${proInformation.proTable.title}
  ${tableOfContents}


  ${proInformation.proInstallation.title}
  ${proInformation.proInstallation.content}


  ${proInformation.proUsage.title}
  ${proInformation.proUsage.content}


  ${proInformation.proLicense.title}
  ${proInformation.proLicense.content}


  ${proInformation.proContribution.title}
  ${proInformation.proContribution.content}


  ${proInformation.proTest.title}
  ${proInformation.proTest.content}

      
  ${proInformation.proQuestions.title}
  ${proInformation.proQuestions.content}
  ${proInformation.proQuestions.email}
  ${proInformation.proQuestions.additional}
  `;
    console.log(fileContent);
    // const turndownService = new TurndownService();
    // const data= turndownService.turndown(`<div>${fileContent}</div>
    // `);
    writeToFile("README.md", fileContent);
  } catch (err) {
    console.log(err);
  }
}

// function call to initialize program
init();
