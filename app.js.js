var mysql = require("mysql");
var inquirer = require("inquirer");
const { empty } = require("rxjs");

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
              return viewEmployees();   
            case 'Add Employee':
              return addEmployee();
            case 'Update Employee':
              return updateEmployee();
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

function viewEmployees(){
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
}

function addEmployee(){
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstname',
        message: "Enter the employee's first name:"
      },
      {
        type: 'input',
        name: 'lastname',
        message: "Enter the employee's last name:"
      },
      {
        type: 'input',
        name: 'role',
        message: "Select the employee's role:"
      }
    ])
    .then(function(res){
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: res.firstname,
          last_name: res.lastname
        },
        function(err) {
          if (err) throw err;
          console.log("Employee successfully updated.");
          start();
        }
      );
    });
}

function updateEmployee(){
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
        type: 'list',
        name: 'selectEmp',
        message: 'Who would you like to update?',
        choices: ()=> {
          let choices = [];
          for(let i=0;i<res.length;i++){
            choices.push(res[i].first_name);
          }
          return choices;
        }
      },
      {
        type: 'list',
        name: 'updateEmp',
        message: 'What would you like to update?',
        choices: ['first name', 'last name', 'role', 'manager']
      }
    ])
      .then(function (res){
        console.log(res.selectEmp);
        if(res.updateEmp === 'first name'){
          updateFirstName();
        }
      });
  });
}

function updateFirstName(){
  inquirer.prompt({
    type: 'input',
    name: 'updateEmpFirst',
    message: "Enter employee's first name"
  })
  .then(function(emp){
    connection.query(
      "UPDATE employee SET ? WHERE ?",
      [
        {
          first_name: emp.updateEmpFirst
        },
        {
          id: res.selectEmp.id
        }
      ],
      function(error) {
        if (error) throw err;
        console.log(`First name changed to ${emp.updateEmpFirst}`);
        start();
      }
    );
  });
}