const express = require('express');
const mysql = require('mysql');
const app = express();

// Create the connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: process.env.PASSWORD,
    database: 'chinook'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('❌ Error connecting to MySQL:', err);
        return;
    }
    console.log('✅ Connected to MySQL');
});

// Example route
app.get('/api/data', (req, res) => {
    connection.query(
        `SELECT * from genres`, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Start server
app.listen(3000, () => console.log('🚀 Server running on port 3000'));
