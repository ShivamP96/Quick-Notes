/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const wolfram = require("./wolfram.js");
const entitiesTxt = require("./google.js");
const keyFilter = require("./keyWords.js")

module.exports = db => {
  router.get("/add", (req, res) => {
    res.render("add");
  });

  router.get("/", (req, res) => {
    const task = `
      SELECT t.id task_id, c.id category_id, t.input, c.title title
      FROM tasks AS t
      INNER JOIN categories AS c ON c.id = t.category_id
    `;
    db.query(task) //adding queries to new variable, they can all load at the same time
      .then(data => { //data is the result of query, use data in templateVars
        let templateVars = {tasks: data.rows}
        // console.log(templateVars.tasks.length);
        res.render("index", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message }); //if not pass error message
      });
  });

  router.post("/", (req, res) => {
    const input = req.body.text
    console.log("YOU ARE ON THE POST /");
    if (!input) {
      res.status(400).json({ error: "invalid request: no data in POST body" });
      return;
    }
    // Promise
   wolfram.wolf(input)
   .then(apiResults => {
     const dbMatch = keyFilter.matchFinder(apiResults)
    db.query(`SELECT id FROM categories WHERE title = '${dbMatch}';`).then(data => {
      console.log('red',`${dbMatch}`)
      console.log('blue', apiResults)
      console.log("====> ",data.rows[0].id)
      if (data.rows.length) {
        // console.log(`INSERT INTO tasks (user_id, input, category_id) VALUES (2,'harry potter',${data.rows[0].id})`)
        db.query(`INSERT INTO tasks (user_id, input, category_id) VALUES (2, '${input}' ,${data.rows[0].id})`).then(data => {
          res.json({status: "success!"});
        })
      }
    })
    //     })
     //temporary to display on screen
      let queryString = `INSERT into tasks(input, category_id) VALUES (${input},${dbMatch})`

     //INSERT INTO DB
     //Response.redirect("/")
     return true;
   })
  });
  return router;
};



