let User = require("../models/user");
let async = require("async");
let { body, validationResult } = require("express-validator");
const user = require("../models/user");

// api calls

// // send list of users
exports.api_user_list = function (req, res, next) {
  User.find({})
    .sort("lastname")
    .exec(function (err, list_users) {
      if (err) return next(err);
      res.json(list_users);
    });
};

// // get specific user
exports.api_user_get = function (req, res, next) {
  async.parallel(
    {
      user: function (callback) {
        User.findById(req.params.userid).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      res.send(results.user);
    }
  );
};

// // create user
exports.api_user_create = [
  // validate and sanitize fields
  body("firstname").trim().isLength({ min: 1 }).escape(),
  body("lastname").trim().isLength({ min: 1 }).escape(),
  body("username").trim().isLength({ min: 1 }).escape(),
  body("admin"),
  // process request
  (req, res, next) => {
    const errors = validationResult(req);
    let user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      admin: req.body.admin,
    });
    if (!errors.isEmpty()) {
      res.send(errors.array());
    } else {
      user.save(function (err) {
        if (err) return next(err);
        async.parallel({
          users: function (callback) {
            User.find({})
              .sort("lastname")
              .exec(function (err, list_users) {
                if (err) return next(err);
                res.send("User successfully created");
              });
          },
        });
      });
    }
  },
];

// delete user
exports.api_user_delete = function (req, res, next) {
  async.parallel(
    {
      user: function (callback) {
        user.findById(req.params.userid).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      User.findByIdAndDelete(req.params.userid, function () {
        if (err) return next(err);
        res.send("User successfully deleted");
      });
    }
  );
};

// update user
exports.api_user_update = [
  // validate and sanitize fields
  body("firstname").trim().isLength({ min: 1 }).escape(),
  body("lastname").trim().isLength({ min: 1 }).escape(),
  body("username").trim().isLength({ min: 1 }).escape(),
  body("admin"),
  // process request
  (req, res, next) => {
    const errors = validationResult(req);
    let user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      admin: req.body.admin,
      _id: req.params.userid,
    });
    if (!errors.isEmpty()) {
      res.send(errors.array());
    } else {
      User.findByIdAndUpdate(req.params.userid, user, {}, (err, theuser) => {
        if (err) return next(err);
        res.send("User successfully updated");
      });
    }
  },
];
