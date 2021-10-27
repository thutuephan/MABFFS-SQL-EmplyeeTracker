const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
// require the console.table package
const table = require('console.table');
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
  .then(function(answer) {
    

  })


}





















// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });  

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});