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

  router.post("/", (req, res) => {
    console.log("YOU ARE ON THE POST /");
    if (!req.body.text) {
      res.status(400).json({ error: "invalid request: no data in POST body" });
      return;
    }
    console.log("This is our input", req.body.text);
    // const adjustInput = req.body.text.to
   //console.log(wolfram.wolf(req.body.text));

   wolfram.wolf(req.body.text)
   .then(apiResults => {
     console.log("api results", apiResults);
     res.json(apiResults);

     keyFilter.filter()

     //INSERT INTO DB
     Response.redirect("/")
     return true;
   })

  });

  return router;
};


