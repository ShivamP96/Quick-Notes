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
  const input = req.body.text

  router.get("/add", (req, res) => {
    res.render("add");
  });

  router.post("/", (req, res) => {
    console.log("YOU ARE ON THE POST /");
    if (!input) {
      res.status(400).json({ error: "invalid request: no data in POST body" });
      return;
    }
    // Promise
   wolfram.wolf(input)
   .then(apiResults => {
     const dbMatch = keyFilter.matchFinder(apiResults)

     if dbMatch === movie
     INSERT INTO C (category_id, inpu)
     category =1

     INSERT
     SELECT categories WHERE dbmatch === categor

     //temporary to display on screen
     res.json(apiResults);
      let queryString = `INSERT into tasks(input, category_id) VALUES (${input},${dbMatch})`


     //INSERT INTO DB
     //Response.redirect("/")
     return true;
   })
  });
  return router;
};


