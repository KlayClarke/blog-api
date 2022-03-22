let Post = require("../models/post");
let async = require("async");
let { body, validationResult } = require("express-validator");

// api calls

// // display list of all posts
exports.api_post_list = function (req, res, next) {
  Post.find({}).exec(function (err, list_posts) {
    if (err) return next(err);
    res.json(list_posts);
  });
};

// // display specific post
exports.api_post_detail = function (req, res, next) {
  async.parallel(
    {
      post: function (callback) {
        Post.findById(req.params.postid).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      res.json(results.post);
    }
  );
};

// create post
exports.api_post_create = [
  // convert body_paragraphs to an array
  (req, res, next) => {
    if (!req.body.body_paragraphs instanceof Array) {
      if (typeof req.body.body_paragraphs === "undefined")
        req.body.body_paragraphs = [];
    } else {
      req.body.body_paragraphs = new Array(req.body.body_paragraphs);
    }
    next();
  },
  // convert images to an array
  (req, res, next) => {
    if (!req.body.images instanceof Array) {
      if (typeof req.body.images === "undefined") {
        req.body.images = [];
      } else {
        req.body.images = new Array(req.body.images);
      }
    }
    next();
  },
  // validate and sanitize fields
  body("title").trim().isLength({ min: 1 }).escape(),
  body("author").trim().isLength({ min: 1 }).escape(),
  body("body_paragraphs.*").trim().escape(),
  body("images.*").trim().escape(),
  body("published").trim().escape(),

  // process request
  (req, res, next) => {
    const errors = validationResult(req);
    let post = new Post({
      title: req.body.title,
      author: req.body.author,
      body_paragraphs: req.body.body_paragraphs,
      images: req.body.images,
    });
    if (!errors.isEmpty()) {
      return res.send(errors.array());
    }
    post.save(function (err) {
      if (err) return next(err);
      return res.send("Post successfully created");
    });
  },
];

// delete post
exports.api_post_delete = function (req, res, next) {
  async.parallel(
    {
      post: function (callback) {
        Post.findById(req.params.postid).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      Post.findByIdAndDelete(req.params.postid, function () {
        if (err) return next(err);
        return res.send("Post successfully deleted");
      });
    }
  );
};

// update post
exports.api_post_update = [
  // validate and sanitize fields
  body("title").trim().isLength({ min: 1 }).escape(),
  body("author").trim().isLength({ min: 1 }).escape(),
  body("body_paragraphs.*").trim().escape(),
  body("images.*").trim().escape(),
  body("published").trim().escape(),
  // process request
  (req, res, next) => {
    const errors = validationResult(req);
    let post = new Post({
      title: req.body.title,
      author: req.body.author,
      body_paragraphs: req.body.body_paragraphs,
      images: req.body.images,
      _id: req.params.postid,
    });
    if (!errors.isEmpty()) {
      return res.send(errors.array());
    }
    Post.findByIdAndUpdate(req.params.postid, post, {}, (err, thepost) => {
      if (err) return next(err);
      return res.send("Post successfully updated");
    });
  },
];
