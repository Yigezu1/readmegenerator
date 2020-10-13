const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown");
const writeFile = util.promisify(fs.writeFile);
const axios = require("axios");
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
    choices: [
      "Apache License v2.0",
      "GNU General Public License v3.0",
      "MIT License",
    ],
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

// function to write to README file
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
        badge: "",
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

    // axios get call to get user's github blog.
    const queryUrl = `https://api.github.com/users/${proInformation.proQuestions.content}`;
    const axiosResponse = await axios.get(queryUrl);
    proInformation.proQuestions.content = `[${axiosResponse.data.name}](${axiosResponse.data.blog})`;

    //  Creates badge based on the license type user selected.
    switch (proInformation.proLicense.content) {
      case "Apache License v2.0":
        proInformation.proLicense.badge =
          "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](#license)";
        break;
      case "GNU General Public License v3.0":
        proInformation.proLicense.badge =
          "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](#license)";
        break;
      case "MIT License":
        proInformation.proLicense.badge =
          "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)";
      default:
        break;
    }

    // Create table of contents
    let tableOfContents = "";
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

    // function call to the generateMarkdown function to create markdown file contents
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

    // Generate the file that will be written to the readme file
    let fileContent = "";
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
    // function call to write the file to the readme.md
    writeToFile("../CodeQuiz/README.md", fileContent);
  } catch {
    throw Error();
  }
}

// function call to initialize program
init();
