let express = require("express");
let post_controller = require("../controllers/postController");
let user_controller = require("../controllers/userController");
let router = express.Router();

// USER MODEL ROUTES

router.get("/users", user_controller.api_user_list);

router.get("/users/:userid", user_controller.api_user_detail);

router.post("/users", user_controller.api_user_create);

router.put("/users/:userid", user_controller.api_user_update);

router.delete("/users/:userid", user_controller.api_user_delete);

// POST MODEL ROUTES

router.get("/posts", post_controller.api_post_list);

router.get("/posts/:postid", post_controller.api_post_detail);

router.post("/posts", post_controller.api_post_create);

router.put("/posts/:postid", post_controller.api_post_update);

router.delete("/posts/:postid", post_controller.api_post_delete);

// COMMENT MODEL ROUTES

router.get("/comments", (req, res, next) => {
  res.send("list of all comments");
});

router.get("/comments/:commentid", (req, res, next) => {
  res.send("get comment details");
});

router.post("/comments", (req, res, next) => {
  res.send("create a comment");
});

router.put("/comments/:commentid", (req, res, next) => {
  res.send("edit a comment");
});

router.delete("/comments/:commentid", (req, res, next) => {
  res.send("delete a comment");
});

module.exports = router;
