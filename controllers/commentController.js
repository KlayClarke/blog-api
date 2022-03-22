let Comment = require("../models/comment");
let async = require("async");
let { body, validationResult } = require("express-validator");

// api calls

// // send list of comments
exports.api_comment_list = function (req, res, next) {
  Comment.find({}).exec(function (err, list_comments) {
    if (err) return next(err);
    return res.json(list_comments);
  });
};

// // send specific comment
exports.api_comment_detail = function (req, res, next) {
  async.parallel(
    {
      comment: function (callback) {
        Comment.findById(req.params.commentid).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      return res.json(results.comment);
    }
  );
};

// // create comment
exports.api_comment_create = [
  // validate and sanitize fields
  body("text").trim().isLength({ min: 1 }).escape(),
  body("author").trim().isLength({ min: 1 }).escape(),
  body("post").trim().isLength({ min: 1 }).escape(),
  // process request
  (req, res, next) => {
    const errors = validationResult(req);
    let comment = new Comment({
      text: req.body.text,
      author: req.body.author,
      post: req.body.post,
    });
    if (!errors.isEmpty()) {
      return res.send(errors.array());
    }
    comment.save(function (err) {
      if (err) return next(err);
      return res.send("Comment successfully created");
    });
  },
];

// // delete comment
exports.api_comment_delete = function (req, res, next) {
  async.parallel(
    {
      comment: function (callback) {
        Comment.findById(req.params.commentid).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      Comment.findByIdAndDelete(req.params.commentid, function () {
        if (err) return next(err);
        return res.send("Comment successfully deleted");
      });
    }
  );
};

// // update comment
exports.api_comment_update = [
  // validate and sanitize fields
  body("text").trim().isLength({ min: 1 }).escape(),
  body("author").trim().isLength({ min: 1 }).escape(),
  body("post").trim().isLength({ min: 1 }).escape(),
  // process request
  (req, res, next) => {
    const errors = validationResult(req);
    let comment = new Comment({
      text: req.body.text,
      author: req.body.author,
      post: req.body.post,
      _id: req.params.commentid,
    });
    if (!errors.isEmpty()) {
      return res.send(errors.array());
    }
    Comment.findByIdAndUpdate(
      req.params.commentid,
      comment,
      {},
      (err, thecomment) => {
        if (err) return next(err);
        return res.send("Comment successfully updated");
      }
    );
  },
];
