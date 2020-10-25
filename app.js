var mysql = require("mysql");
var inquirer = require("inquirer");
const { empty } = require("rxjs");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pword",
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
            choices: ['View all employees', 'View employees by department', 'View employees by role',
            'Add Employee', 'Update Employee', 'Remove Employee', 
            'View All Roles', 'Add Role', 'Update Role', 
            'View All Departments', 'Add Department', 'Update Department', 
            'Exit']
        })
        .then(function(answer) {
          switch (answer.start) {
            case 'View all employees':
              return viewEmployees();  
            case 'View employees by department':
              return viewByDept(); 
            case 'Add Employee':
              return addEmployee();
            case 'Update Employee':
              return updateEmployee();
            case 'Remove Employee':
              return removeEmployee();
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
              return console.log("Hi");
            case 'Exit':
              connection.end();
          }
        });
}

function viewEmployees(){
  connection.query(
    "SELECT first_name, last_name, title, dept_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id", 
    function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewByDept(){
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectDept',
          message: 'Select a department',
          choices: ()=> {
            let choices = [];
            for(let i=0;i<res.length;i++){
              choices.push(res[i].first_name);
            }
            return choices;
          } 
        }
      ])
      .then(function(answer){
        var dept = answer.selectDept;
        console.log(dept);
      });
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
    let chosenID;
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectEmp',
          message: 'Who would you like to update?',
          choices: ()=> {
            let choices = [];
            for(let i=0;i<res.length;i++){
              choices.push(res[i].id +" "+ res[i].first_name);
            }
            return choices;
          } 
        }
      ])
      .then(function (answerWho){
        var split = answerWho.selectEmp.split(" ");
        chosenID = split[0];
        console.log("Chosen ID: " + chosenID);

        inquirer
        .prompt([
        {
          type: 'list',
          name: 'updateEmp',
          message: 'What would you like to update?',
          choices: ['first name', 'last name', 'title', 'manager']
        }
        ])
        .then(function (answer){
          
          if(answer.updateEmp === 'first name'){
            updateFirstName(chosenID);
          }else if (answer.updateEmp === 'last name'){
            updateLastName(chosenID);
          }else if (answer.updateEmp === 'title'){
            updateTitle(chosenID);
          }
      }); 
    });
  });
}

function updateFirstName(empID){
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
          id: empID
        }
      ],
      function(error) {
        if (error) throw error;
        console.log(`First name changed to ${emp.updateEmpFirst}`);
        start();
      }
    );
  });
}

function updateLastName(empID){
  inquirer.prompt({
    type: 'input',
    name: 'updateEmpLast',
    message: "Enter employee's last name"
  })
  .then(function(emp){
    connection.query(
      "UPDATE employee SET ? WHERE ?",
      [
        {
          last_name: emp.updateEmpLast
        },
        {
          id: empID
        }
      ],
      function(error) {
        if (error) throw error;
        console.log(`Last name changed to ${emp.updateEmpLast}`);
        start();
      }
    );
  });
}

function updateTitle(empID){
  var chosenRole;
  var chosenRoleID;
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;

    inquirer.prompt({
      type: 'list',
      name: 'updateTitle',
      message: "Select title",
      choices: ()=> {
        let choices = [];
        for(let i=0;i<res.length;i++){
          choices.push(res[i].id +" "+ res[i].title);
        }
        return choices;
      } 
    })
    .then(function(answer){
      var split = answer.updateTitle.split(" ");
      chosenRoleID = split[0];
      chosenRole = split[1];

      connection.query("SELECT * FROM role WHERE ?", 
      {
        id: chosenRoleID
      },
      function(error, res){
        if (error) throw error;
        connection.query(
          "UPDATE employee SET ? WHERE ?",
          [
            {
              role_id: chosenRoleID
            },
            {
              id: empID
            }
          ],
          function(error) {
            if (error) throw error;
            console.log(`Title changed to ${chosenRole} roleID: ${chosenRoleID} where id: ${empID}`);
            start();
          }
        );
      });
    });
  }); //end connection
} // end function










function removeEmployee(){
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectEmp',
          message: 'Who would you like to remove?',
          choices: ()=> {
            let choices = [];
            for(let i=0;i<res.length;i++){
              choices.push(res[i].id +" "+ res[i].first_name);
            }
            return choices;
          } 
        }
      ])
      .then(function (answerWho){
        chosenID = answerWho.selectEmp.charAt(0);
        console.log("Chosen ID: " + chosenID);

        connection.query("DELETE FROM employee WHERE ?", 
        {
          id: chosenID
        },
        function(err) {
          if (err) throw err;
          console.log("Successfully deleted employee id: " + chosenID);
          start();
        });
      });
  });
}