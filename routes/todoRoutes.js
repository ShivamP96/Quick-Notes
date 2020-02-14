/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const wolfram = require("./wolfram.js");
const keyFilter = require("./keyWords.js");

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
      .then(data => {
        //data is the result of query, use data in templateVars
        // console.log("red", data);
        let templateVars = { tasks: data.rows };
        res.render("todos/index", templateVars);
      })
      .catch(err => {
        res.status(500).json({ error: err.message }); //if not pass error message
      });
  });

  router.post("/", (req, res) => {
    const input = req.body.text;
    console.log("YOU ARE ON THE POST /");
    if (!input) {
      res.status(400).json({ error: "invalid request: no data in POST body" });
      return;
    }
    // Promise
    wolfram.wolf(input)
    .then(apiResults => {

      const matching = function(apiResults) {
        console.log("API Results",apiResults);
        const dbMatch = keyFilter.matchFinder(apiResults);
        console.log("dbMatch",dbMatch);
        return dbMatch;
      }
      
    let test;

    if (apiResults === undefined || apiResults === []) {
      test = 'Other';
    } else {
      test = matching(apiResults);
    }


     console.log("MatchKey",test);
     db.query(`SELECT id FROM categories WHERE title = $1;`, [test])
      .then(data => {
          if (data.rows.length) {
            db.query(
              `INSERT INTO tasks (user_id, input, category_id) VALUES ($1, $2 ,$3)`, [2, input, data.rows[0].id]
            ).then(data => {
              // res.json({ status: "success!" });
              res.redirect("/todo")
            });
          }
        });
      return true;
    });
  });
  return router;
};
