const categorize = function(user, input, category){


  let queryInsert = `INSERT into tasks (user_id, input, category_id) VALUES (req.body.user, req.body.text, googleFunction(req.body.category_id))`
}

