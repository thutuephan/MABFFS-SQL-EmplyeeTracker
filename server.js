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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
  {

    host: 'localhost',
    user: 'root',
    password: 'PerfectLaLaLand_29',
    database: 'company_db',
  }
);

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
    .then(function (answers) {
      switch (answers.menu) {
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
          break;
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
  connection.query(query, function (err, res) {
    if (err) {
      console.log(err)
    }
    else {
      // do stuff with the results 
      console.log(res)
      console.table(res);
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
  ]).then(function (answers) {
    connection.query(`INSERT INTO department (name) VALUES ('${answers.newDepartmentName}');`, (err, res) => {
      if (err) throw err;
      console.log('New department has been added!');
      console.log(res);
      options();
    })
  })
};

function viewAllRoles() {
  const query = 'SELECT * FROM role';
  connection.query(query, (err, res) => {
    if (err) throw err;
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
    let deptArray = data.map(function (department) {
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
          if (isNaN(salaryInput)) {
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
    ]).then(function (answers) {
      connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.newRoleName}', '${answers.newRoleSalary}', '${answers.departmentId}');`, (err, res) => {
        if (err) throw err;
        console.log('New role has been added!');
        console.log(res);
        options();
      })
    })
  });
}
function viewAllEmployees() {
  //THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

  // employee.role_id = role.id: checking if the employee.role_id matches the role.id

  // Combine the SELECT and FROM into one string and add that to the query const variable 
  // LEFT JOIN add its to the left

  const query = `SELECT employee.id, employee.first_name, employee.last_name, role.salary, role.title, department.name AS department, CONCAT(manager.first_name," ", manager.last_name) AS manager
  
  FROM employee

  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager ON manager.id = employee.manager_id;
  `

  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(res);
    console.table(res);
    options();
  })
};

function addEmployee() {
  let roleArray = [];
  let managerArray = [];
  connection.query('SELECT id, title FROM role', (err, data) => {
    if (err) throw err;
    // created an array of object-role to return values
    roleArray = data.map(function (role) {
      return {
        name: role.title,
        value: role.id
      }
    });
    connection.query('SELECT id, first_name, last_name FROM employee', (err, data) => {
      if (err) throw err;
      // created an array of object-manager to return values
      managerArray = data.map(function (employee) {
        return {
          name: employee.first_name + " " + employee.last_name,
          value: employee.id
        }
      });
      // managerArray.push({
      //   value: '',
      //   name: 'None'
      // })


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
          type: 'list',
          name: 'employeeRole',
          message: 'What is the employee\'s role?',
          choices: roleArray
        },
        {
          type: 'list',
          name: 'empManager',
          message: 'Who is the manager of the employee?',
          choices: managerArray
        },
      ]).then(function (answers) {
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.newFirstName}', '${answers.newLastName}', '${answers.employeeRole}', '${answers.empManager}');`, (err, res) => {
          if (err) throw err;
          console.log('New employee has been added!');
          console.log(res);
          options();
        })
      })
    })
  })
}

function updateEmployeeRole() {
  let roleArray = [];
  let employeeArray = [];

  connection.query('SELECT id, title FROM role', (err, data) => {
    if (err) throw err;
    roleArray = data.map(function (role) {
      return {
        name: role.title,
        value: role.id
      }
    });

    connection.query('SELECT id, first_name, last_name FROM employee', (err, data) => {
      if (err) throw err;
      // created an array of object-manager to return values
      employeeArray = data.map(function (employee) {
        return {
          name: employee.first_name + " " + employee.last_name,
          value: employee.id
        }

      });
      inquirer.prompt([
        {
          type: 'list',
          name: 'upEmployee',
          message: 'Which employee would you like to update?',
          choices: employeeArray
        },
        {
          type: 'list',
          name: 'newRole',
          message: 'Which role do you want to assign the selected employee',
          choices: roleArray
        },

      ]).then(function (answers) {
        connection.query(`UPDATE employee SET role_id = '${answers.newRole}' WHERE id = '${answers.upEmployee}'`, (err, res) => {
          if (err) throw err;
          console.log('Employee updated!');
          console.log(res);
          options();
        })
      })

    })

  })
}

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected to the company_db database.`);
  options();
})

quitApp = () => {
  console.log('See you next time!');
  connection.end();

}


