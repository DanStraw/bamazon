const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: '8080',
    user: 'root',
    password: 'root',
    database: 'bamazon',
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log(`Connected as ${connection.threadId}`)
});
connection.query('select * from products', (error, response) => {
    if (error) throw error
    console.log(response);
});

connection.end();