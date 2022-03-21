let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
  text: { type: String, required: true, minlength: 1 },
  timestamp: { type: Date, default: Date.now() },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  author: { type: Schema.Types.ObjectId, ref: "Author" },
});

// virtual for comment url
CommentSchema.virtual("url").get(function () {
  return `/posts/${this.post}/comments/${this._id}`;
});

// export comment model
module.exports = mongoose.model("Comment", CommentSchema);
