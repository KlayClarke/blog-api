let express = require("express");
let router = express.Router();

let user_controller = require("../controllers/userController");
let post_controller = require("../controllers/postController");
let comment_controller = require("../controllers/commentController");

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

router.get("/comments", comment_controller.api_comment_list);

router.get("/comments/:commentid", comment_controller.api_comment_detail);

router.post("/comments", comment_controller.api_comment_create);

router.put("/comments/:commentid", comment_controller.api_comment_update);

router.delete("/comments/:commentid", comment_controller.api_comment_delete);

module.exports = router;
