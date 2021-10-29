const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
// require the console.table package
const table = require('console.table');
const { query } = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
  {

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company',
  }
);
connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected to the company_db database.`);
})

function options() {
  inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: [
              'View All Departments',
              'Add Department',
              'View All Roles',
              'Add Role',
              'View All Employees',
              'Add Employee',
              'Update Employee Role',
              'Quit'
    ]
    
  })
  .then(function(answers) {
    switch(answers.menu) {
      case 'View All Departments':
        viewAllDepartments();
        break;
      case 'Add Department':
        addDepartment();
        break;
      case 'View All Roles':
        viewAllRoles();
        break;
      case 'Add Role':
        addRole();
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Update Employee Role':
        updateEmployeeRole();
        break;
      case 'Quit':
        quitApp();
        break;
      default:
        console.log("You chose wrong.")
    }
  })

};

function viewAllDepartments() {
  const query = 'SELECT * FROM deparment';
  connection.query(query, function(err, res) {
    if (err) {
      console.log(err)
    }
    else {
      // do stuff with the results 
      console.log(res)
      console.table(results);
      options();
    }
  })
};

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'newDepartmentName',
      message: 'Which department would you like to add?'
  
    }
    ]).then(function(answers) {
      connection.query(`INSERT INTO department (name) VALUES ('${answers.newDepartment}');`, (err, res) => {
        if(err) throw err;
        console.log('New department added!');
        console.log(res);
        options();
      })
    })
};

function viewAllRoles() {
  const query = 'SELECT * FROM role';
  connection.query(query, (err, res) => {
    if(err) throw err;
    console.log(res);
    console.table(res);
    options();
  })
};

// Add a role to the table database with the name, salary, and the department it belongs to
function addRole() {
  
  connection.query('SELECT * FROM department', (err, data) => {
    if (err) throw err;
    let deptArray = data.map(function(department) {
      return {
      name: department.name,
      value: department.id
      }
    });
    

    inquirer.prompt([
      {
        type: 'input',
        name: 'newRoleName',
        message: 'Which role would you like to add?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Please enter the salary for this new role.',
        validate: salaryInput => {
          if(isNaN(salaryInput)) {
            console.log('Please enter a number.')
            return false;
          } else {
            return true;
          }
        }
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Which department does the new role belong to?',
        choices: deptArray
      }
    ])
  });

function viewAllEmployees() {
  const query = 'SELECT * FROM employee';
  connection.query(query, (err, res) => {
    if(err) throw err;
    console.log(res);
    console.table(res);
    options();
  })
};



















// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });  

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});