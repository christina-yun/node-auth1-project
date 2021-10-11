const express = require('express');
const { checkUsernameFree, checkUsernameExists, checkPasswordLength, hashPassword } = require('./auth-middleware.js');
const Users = require('./../users/users-model.js')

const router = express.Router();

router.post('/register', checkUsernameFree, checkPasswordLength, hashPassword, (req, res, next) => {
  Users.add(req.user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(next)
})

/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */
router.post('/login', checkUsernameExists, (req, res, next) => {})

/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */
router.get('/logout', (req, res, next) => {})
 
module.exports = router;
