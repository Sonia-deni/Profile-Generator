const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const questions = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'managerName',
      message: 'Please enter the team manager name',
      validate: (managerName) => {if(managerName.length>0){return true} else{console.log('Cannot be empty'); return false}}
    },
    {
      type: 'input',
      name: 'managerEmployeeID',
      message: 'Please enter the team manager Employee ID',
      validate: (managerEmployeeID) => {if(managerEmployeeID.length>0){return true} else{console.log('Cannot be empty'); return false}}
    },
    {
      type: 'input',
      name: 'managerEmail',
      message: 'Please enter the team manager email address',
      validate: (managerEmail) => {if(managerEmail.length>0){return true} else{console.log('Cannot be empty'); return false}}
    },
    {
      type: 'input',
      name: 'managerOfficeNo',
      message: 'Please enter the team manager office number',
      validate: (managerOfficeNo) => {if(managerOfficeNo.length>0){return true} else{console.log('Cannot be empty'); return false}}
    },
    {
      type: 'rawlist',
      name: 'memberToAdd',
      message: 'Please select employee type to add to the team',
      choices: ['engineer', 'intern', 'team is complete']
    },
   
  ]);


const init = async () => {
   
    const answers = await questions();
       
    const initialInput = (answers);
    //console.log(initialInput);

    const managerCard = new Manager(answers.managerName, answers.managerEmployeeID, answers.managerEmail, answers.managerOfficeNo);
    console.log(managerCard);
  };


init();
