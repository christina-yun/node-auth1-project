const express = require("express");
const {
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
  hashPassword,
  comparePasswords,
} = require("./auth-middleware.js");
const Users = require("./../users/users-model.js");

const router = express.Router();

router.post(
  "/register",
  checkUsernameFree,
  checkPasswordLength,
  hashPassword,
  (req, res, next) => {
    Users.add(req.user)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch(next);
  }
);

router.post(
  "/login",
  checkUsernameExists,
  comparePasswords,
  (req, res, next) => {
    try {
      res.status(200).json({ message: `welcome ${req.body.username}` });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/logout", (req, res, next) => {
  if (req.session.user) {
    req.session.destroy();
    next({ status: 200, message: "logged out" });
  } else {
    next({ status: 200, message: "no session" });
  }
});

module.exports = router;
