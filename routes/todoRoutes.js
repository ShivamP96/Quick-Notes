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

  // router.get("/", (req, res) => {
  //   res.render("index");
  // });

  router.post("/", (req, res) => {
    console.log("YOU ARE ON THE POST /")
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
