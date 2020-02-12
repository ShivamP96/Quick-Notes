/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const analyzeTxt = require("./google.js");
const classifyTxt = require("./google.js");
const entitiesTxt = require("./google.js");

module.exports = (db) => {

  router.get("/add", (req,res) => {
    res.render("add");
  })

  router.get("/", (req, res) => {
    const task = `
      SELECT t.id task_id, c.id category_id, t.input, c.title title
      FROM tasks AS t
      INNER JOIN categories AS c ON c.id = t.category_id
    `; //only select for books
    db.query(task) //adding queries to new variable, they can all load at the same time
      .then(data => { //data is the result of query, use data in templateVars
        // TODO: Group your tasks by category
        let templateVars = {tasks: data.rows}
        console.log(templateVars.tasks.length);
        res.render("index", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message }); //if not pass error message
      });
  });


  router.post("/", (req, res) => {
    if (!req.body.text) {
      res.status(400).json({error: 'invalid request: no data in POST body'});
      return;
    }
    console.log("This is our input",req.body.text)
    console.log(analyzeTxt.analyzeSentimentOfText(req.body.text));

    // analyzeTxt.analyzeSentimentOfText(req.body.text)
    console.log(classifyTxt.classifyTextOfText(req.body.text));
    //res.render("index")

    console.log(entitiesTxt.analyzingEntities(req.body.text));
  })
  return router;
};


