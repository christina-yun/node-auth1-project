const Users = require('./../users/users-model');
const bcrypt = require('bcryptjs');

/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted(req, res, next) {
  if(req.session.user) {
    next();
  } else {
    next({ status: 401, message: "You shall not pass!" });
  }
  
}

async function checkUsernameFree(req, res, next) {
  const newUsername = await Users.findBy({
    username: req.body.username,
  }).first();
  if (newUsername) {
    next({ status: 422, message: "Username taken" });
  } else {
    next();
  }
}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
async function checkUsernameExists(req, res, next) {
  const validUsername = await Users.findBy({ username: req.body.username });

  if(!validUsername) {
    next({ status: 401, message: 'Invalid credentials'});
  } else {
    next();
  }
}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength(req, res, next) {
  const validPassword = req.body.password;

  if(validPassword === undefined || validPassword.length < 4){
    next({ status: 422, message: 'Password must be longer than 3 chars'})
  } else {
    next();
  }
}

function hashPassword(req, res, next){
  const hash = bcrypt.hashSync(req.body.password, 8);
  req.user = { ...req.body, password: hash }
  next();
}

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
  hashPassword
}
