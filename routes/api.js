let express = require("express");
let user_controller = require("../controllers/userController");
let router = express.Router();

// AUTHOR MODEL ROUTES

router.get("/users", user_controller.api_user_list);

router.post("/users", user_controller.api_user_create);

router.get("/users/:userid", (req, res, next) => {
  res.send("get user details on " + req.params.userid);
});

router.put("/users/:userid", (req, res, next) => {
  res.send("edit an user");
});

router.delete("/users/:userid", user_controller.api_user_delete);

// POST MODEL ROUTES

router.get("/posts", (req, res, next) => {
  res.send("list of all posts");
});

router.post("/posts", (req, res, next) => {
  res.send("create a post");
});

router.get("/posts/:postid", (req, res, next) => {
  res.send("get post details");
});

router.put("/posts/:postid", (req, res, next) => {
  res.send("edit a post");
});

router.delete("/posts/:postid", (req, res, next) => {
  res.send("delete a post");
});

// COMMENT MODEL ROUTES

router.get("/comments", (req, res, next) => {
  res.send("list of all comments");
});

router.post("/comments", (req, res, next) => {
  res.send("create a comment");
});

router.get("/comments/:commentid", (req, res, next) => {
  res.send("get comment details");
});

router.put("/comments/:commentid", (req, res, next) => {
  res.send("edit a comment");
});

router.delete("/comments/:commentid", (req, res, next) => {
  res.send("delete a comment");
});

module.exports = router;
