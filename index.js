const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve("./", "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const team = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const employeeQuestions = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Please enter name',
                validate: (name) => {if(name.length>0){return true} else{console.log('Cannot be empty'); return false}}
              },
              {
                type: 'input',
                name: 'employeeID',
                message: 'Please enter Employee ID',
                validate: (employeeID) => {if(employeeID.length>0){return true} else{console.log('Cannot be empty'); return false}}
              },
              {
                type: 'input',
                name: 'email',
                message: 'Please enter email address',
                validate: (email) => {if(email.length>0){return true} else{console.log('Cannot be empty'); return false}}
              },
            ]);
}

const createManager = async () => {
    const employee = await employeeQuestions();
     inquirer
      .prompt([
              {
                type: 'input',
                name: 'managerOfficeNo',
                message: 'Please enter the team manager office number',
                validate: (officeNo) => {if(officeNo.length>0){return true} else{console.log('Cannot be empty'); return false}}
              }
        ])
      .then(val => {
        employee.officeNumber = val.managerOfficeNo;
        const teamManager = new Manager(employee.name, employee.employeeID, employee.email, employee.officeNumber);
        team.push(teamManager);
        nextEmployeeType();
      });
    }
   

  const createEngineer = async () => {
    const nextEmployee = await employeeQuestions();
    inquirer
      .prompt([
              {
                type: 'input',
                name: 'github',
                message: 'Please enter github',
                validate: (github) => {if(github.length>0){return true} else{console.log('Cannot be empty'); return false}}
              }
        ])
      .then(val => {
        nextEmployee.github = val.github;
        const teamMember = new Engineer(nextEmployee.name, nextEmployee.employeeID, nextEmployee.email, nextEmployee.github);
        console.log(teamMember);
        team.push(teamMember);
        nextEmployeeType();
      });
  }


  const createIntern = async () => {
    const nextEmployee = await employeeQuestions();
    inquirer
      .prompt([
              {
                type: 'input',
                name: 'school',
                message: 'Please enter school',
                validate: (school) => {if(school.length>0){return true} else{console.log('Cannot be empty'); return false}}
              }
        ])
      .then(val => {
        nextEmployee.school = val.school;
        const teamMember = new Intern(nextEmployee.name, nextEmployee.employeeID, nextEmployee.email, nextEmployee.school);
        team.push(teamMember);
        nextEmployeeType();
      });
  }


  const nextEmployeeType = async () => { 
    return inquirer
        .prompt([
            {
                type: 'rawlist',
                name: 'memberToAdd',
                message: 'Please select employee type to add to the team',
                choices: ['engineer', 'intern', 'team is complete']
              }
            ])
            .then(val => {
                if (val.memberToAdd === "engineer") {
                  createEngineer();
                } else if(val.memberToAdd === "intern"){
                  createIntern();
                } else{
                    console.log("Team complete!");
                    const generateHTML = render(team);
                    createPage(generateHTML);
                }
              });
}

const createPage = (html) => {
    fs.writeFile(outputPath, html, "utf-8", (err) =>
    err ? console.error(err) : console.log('html written'));
}

 createManager();
