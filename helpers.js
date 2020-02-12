
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


// Returns the URLs where the userID is equal to the id of the currently logged in user
function urlsForUser(id, urlDatabase) {
  let newDatabase = {}
  for (const item in urlDatabase) {
    if(urlDatabase[item].userID === id) {
      //console.log(urlDatabase[item])
       newDatabase[item] = urlDatabase[item];
    }
  }
  return newDatabase;
}


module.exports = { emailExistence, urlsForUser }





