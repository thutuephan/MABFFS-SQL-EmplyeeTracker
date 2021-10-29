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
  const query = 'SELECT * FROM department';
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
    // created an array of object-department to return values
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
        name: 'newRoleSalary',
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
    ]).then(function(answers) {
      connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.newRoleName}, ${answers.newRoleSalary}, ${answers.departmentId}');`, (err, res) => {
        if(err) throw err;
        console.log('New role added!');
        console.log(res);
        options();
      })
    })
  });
}
function viewAllEmployees() {
  const query = 'SELECT * FROM employee';
  connection.query(query, (err, res) => {
    if(err) throw err;
    console.log(res);
    console.table(res);
    options();
  })
};

function addEmployee() {
  connection.query('SELECT id, title FROM role', (err, data) => {
    if (err) throw err;
    // created an array of object-role to return values
    let roleArray = data.map(function(role) {
      return {
      name: role.title,
      value: role.id
      }
    });
  })
  
  connection.query('SELECT id, first_name, last_name FROM employee', (err, data) => {
    if (err) throw err;
    // created an array of object-manager to return values
    let managerArray = data.map(function(employee) {
      return {
      name: employee.first_name + " " + employee.last_name,
      value: employee.id
      }
      
    });
    managerArray.push({
      value: null,
      name: 'None'
    })
  })
  
  inquirer.prompt([
    
    {
      type: 'input',
      name: 'newFirstName',
      message: 'Please enter the employee\'s first name.'
  
    },
    {
      type: 'input',
      name: 'newLastName',
      message: 'Please enter the employee\'s last name.'
  
    },
    {
      type: 'input',
      name: 'employeeRole',
      message: 'What is the employee\'s role?',
      choices: roleArray
  
    },
    {
      type: 'input',
      name: 'empManager',
      message: 'Who is the employee\'s manager?',
      choices: managerArray
      
    }
  ])
 }
 
  
  
























// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });  

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});