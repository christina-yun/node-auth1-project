const express = require("express");
const router = express.Router();
const { restricted } = require("./../auth/auth-middleware.js");
const Users = require("./users-model.js");

router.get("/", restricted, (req, res, next) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

module.exports = router;
