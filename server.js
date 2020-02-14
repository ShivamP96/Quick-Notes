// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const helpers    = require('./helpers.js')

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js')
console.log(dbParams)
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const todoRoutes = require("./routes/todoRoutes");
const widgetsRoutes = require("./routes/widgets");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
//app.use("/api/users", usersRoutes(db));

app.use("/todo", todoRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("homepage");
});
// app.get("/login", (req, res) => {
//   res.render("login");
// });

// app.get("/register", (req, res) => {
//   res.render("register");
// });

app.post("/register", async(req,res) =>{
  console.log("Hey we connected to /register POST")
  //id already created in db
  let{email, password} = req.body
  console.log(req.body);

  if (email.length === 0 || password.length === 0) {
    res.status(400).send("error 400");
  }
  try{
  const existing = await db.query(`SELECT id FROM users WHERE email = '${email}';`)
  if (existing.rowCount ){
    res.status(400).send('youre already sign up please login ')
  }
    await db.query(`INSERT into users( name, email, password) VALUES ('test1', '${email}', '${password}');`)
  res.status(200).send('success')
  }catch(e){
    // console.log('red',e)
  }
  // else if(){
  //   console.log(`'${email}'`)
  //   console.log("this wow")

  // }else {
    console.log('this worksssssssss')
  return


  // } else if (helpers.emailExistence(email, users)) {
  //   response.status(400).send("email already exists");
  // } else {
  //   users[randomID] = { id: randomID, email: email, password: bcrypt.hashSync(password, 10)};
  //   request.session.user_id = randomID;
  //   response.redirect("/urls");
  //}
})


// Helper functions

function emailExistence(email, users) {
  let keys = Object.keys(users);

  for (const element of keys) {
    if (users[element].email === email) {
      return users[element];
    }
  }
  return undefined;
}



const task = `
      SELECT t.id task_id, c.id category_id, t.input, c.title title
      FROM tasks AS t
      INNER JOIN categories AS c ON c.id = t.category_id
    `;
    db.query(task) //adding queries to new variable, they can all load at the same time













app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
