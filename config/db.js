var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'memc122_demo_db',
});

connection.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('MySQL database connected successfully');
  }
});

module.exports = connection;
