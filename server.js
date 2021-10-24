const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees',
  },
    console.log(`Connected to the employees_db database.`)
);






app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});