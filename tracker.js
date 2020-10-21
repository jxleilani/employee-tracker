var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Kalea0220*",
    database: "employee_db"
  });

  connection.connect(function(err) {
    if (err) throw err;

    start();
  });


function start() {
    inquirer
        .prompt({
            type: 'list',
            name: 'start',
            message: 'What would you like to do?',
            choices: ['View all employees', 'Add Employee', 'Update Employee', 'Remove Employee', 'View All Roles', 'Add Role', 'Update Role', 'View All Departments', 'Add Department', 'Update Department']
        })
        .then(function(answer) {
          switch (answer.start) {
            case 'View all employees':
              return console.log("You want to view employees");
            case 'Add Employee':
              return console.log("Hi");
            case 'Update Employee':
              return console.log("Hi");
            case 'Remove Employee':
              return console.log("Hi");
            case 'View All Roles':
              return console.log("Hi");
            case 'Add Role':
              return console.log("Hi");
            case 'Update Role':
              return console.log("Hi");
            case 'View All Departments':
              return console.log("Hi");
            case 'Add Department':
              return console.log("Hi");
            case 'Update Department':
          }
        });
}