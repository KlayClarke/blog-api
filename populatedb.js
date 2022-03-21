#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Comment = require("./models/comment");
var User = require("./models/user");
var Post = require("./models/post");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var users = [];
var posts = [];
var comments = [];

function userCreate(firstname, lastname, username, password, admin, cb) {
  let userdetail = { firstname, lastname, username, password, admin };
  let user = new User(userdetail);
  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New User: " + user);
    users.push(user);
    cb(null, user);
  });
}

function postCreate(title, body, author, cb) {
  let postdetail = { title, body, author };
  let post = new Post(postdetail);
  post.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Post: " + post);
    posts.push(post);
    cb(null, post);
  });
}

function commentCreate(text, post, author, cb) {
  let commentdetail = { text, post, author };
  let comment = new Comment(commentdetail);
  comment.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Comment: " + comment);
    comments.push(comment);
    cb(null, comment);
  });
}

function createUsers(cb) {
  async.series(
    [
      function (callback) {
        userCreate(
          "Klay",
          "Clarke",
          "klayclarke",
          "testpassword",
          true,
          callback
        );
      },
      function (callback) {
        userCreate("Jane", "Doe", "janedoe", "testpassword", false, callback);
      },
    ],
    // optional callback
    cb
  );
}

function createPosts(cb) {
  async.series(
    [
      function (callback) {
        postCreate(
          "First Post",
          "This is my first post. I guess I am officially a blogger",
          users[0],
          callback
        );
      },
      function (callback) {
        postCreate(
          "hello world",
          "I am jane and this is my first community post. Thanks for listening",
          users[1],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createComments(cb) {
  async.series(
    [
      function (callback) {
        commentCreate(
          "Hi Klay, thanks for creating this site",
          posts[0],
          users[1],
          callback
        );
      },
      function (callback) {
        commentCreate(
          "hi jane, this is klay. thank you for using my site",
          posts[1],
          users[0],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createUsers, createPosts, createComments],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Comments: " + comments);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
