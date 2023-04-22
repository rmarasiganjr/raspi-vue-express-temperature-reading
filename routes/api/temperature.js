const express = require('express');
const app = express();

var router = express.Router();

var dbConn = require('../../config/db.js');

// INSERT
// @routes POST api/temperature/add
// @desc Insert Data to the database
// @access PRIVATE
router.post('/add', (req, res) => {
  console.log(req.body);

  var temp = req.body.temperature;
  var deviceId = req.body.deviceId;
  var date = req.body.date;

  var sqlQuery = `INSERT INTO temp_tb(temperature,deviceId,date) VALUES(${temp},'${deviceId}','${date}')`;

  dbConn.query(sqlQuery, function (error, results) {
    if (error) throw error;

    res.status(200).json({ msg: 'Data Inserted Succesfully', res: results });
  });
});

// SELECT or (VIEW)
// @routes GET api/temperature/view
// @desc Display ALL Data from the database
// @access PUBLIC
router.get('/view', (req, res) => {
  var sqlQuery = `SELECT * FROM temp_tb`;

  dbConn.query(sqlQuery, function (error, results) {
    if (error) throw error;

    res.status(200).json({ res: results });
  });
});

// UPDATE
// @routes PUT api/temperature/update/:id
// @desc UPDATE Data to the database
// @access PRIVATE
router.put('/update/:id', (req, res) => {
  var id = req.params.id;
  var temp = req.body.temperature;
  //var deviceId = req.body.deviceId;
  var date = req.body.date;

  var sqlQuery = `UPDATE temp_tb SET temperature = ${temp}, date = '${date}' WHERE tempReadingId=${id} `;

  dbConn.query(sqlQuery, function (error, results) {
    if (error) throw error;

    res.status(200).json({ msg: 'Data Updated Succesfully', res: results });
  });
});

// DELETE
// @routes DELETE api/temperature/delete/:id
// @desc DELETE Data to the database
// @access PRIVATE

module.exports = router;
