let express = require("express");
let router = express.Router();

let user_controller = require("../controllers/userController");
let post_controller = require("../controllers/postController");
let comment_controller = require("../controllers/commentController");

// USER MODEL ROUTES

router.get(`/users/${process.env.BLOG_API_KEY}`, user_controller.api_user_list);

router.get(
  `/users/:userid/${process.env.BLOG_API_KEY}`,
  user_controller.api_user_detail
);

router.post(
  `/users/${process.env.BLOG_API_KEY}`,
  user_controller.api_user_create
);

router.put(
  `/users/:userid/${process.env.BLOG_API_KEY}`,
  user_controller.api_user_update
);

router.delete(
  `/users/:userid/${process.env.BLOG_API_KEY}`,
  user_controller.api_user_delete
);

// POST MODEL ROUTES

router.get(`/posts/${process.env.BLOG_API_KEY}`, post_controller.api_post_list);

router.get(
  `/posts/:postid/${process.env.BLOG_API_KEY}`,
  post_controller.api_post_detail
);

router.post(
  `/posts/${process.env.BLOG_API_KEY}`,
  post_controller.api_post_create
);

router.put(
  `/posts/:postid/${process.env.BLOG_API_KEY}`,
  post_controller.api_post_update
);

router.delete(
  `/posts/:postid/${process.env.BLOG_API_KEY}`,
  post_controller.api_post_delete
);

// COMMENT MODEL ROUTES

router.get(
  `/comments/${process.env.BLOG_API_KEY}`,
  comment_controller.api_comment_list
);

router.get(
  `/comments/:commentid/${process.env.BLOG_API_KEY}`,
  comment_controller.api_comment_detail
);

router.post(
  `/comments/${process.env.BLOG_API_KEY}`,
  comment_controller.api_comment_create
);

router.put(
  `/comments/:commentid/${process.env.BLOG_API_KEY}`,
  comment_controller.api_comment_update
);

router.delete(
  `/comments/:commentid/${process.env.BLOG_API_KEY}`,
  comment_controller.api_comment_delete
);

module.exports = router;
