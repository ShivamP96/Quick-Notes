const express = require('express');
const router  = express.Router();
// const bodyParser = require("body-parser");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const bookTask = `SELECT * FROM TASKS WHERE category_id = 1`;
    const watchTask = `SELECT * FROM TASKS WHERE category_id = 2`;
    const eatTask = `SELECT * FROM TASKS WHERE category_id = 3`;
    const buyTask = `SELECT * FROM TASKS WHERE category_id = 4`;
    const otherTask = `SELECT * FROM TASKS WHERE category_id = 5`;
    let taskInfo = db.query(bookTask, watchTask, eatTask, buyTask, otherTask); //adding queries to new variable, they can all load at the same time
    let templateVars = {tasks: taskInfo}; //need template vars, passing in query info into task variable-used in index.ejs
      .then(data => { //then redirect to index page? with templateVars info
        // const widgets = data.rows;
        // res.json({ widgets });
        res.render("/", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message }); //if not pass error message
      });
  });
  return router;
};
