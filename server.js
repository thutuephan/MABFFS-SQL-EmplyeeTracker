const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// require the console.table package
const table = require('console.table');
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
    database: 'company',
  },
    console.log(`Connected to the company_db database.`)
);



// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });  


app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});