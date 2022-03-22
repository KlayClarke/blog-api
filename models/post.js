let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PostSchema = new Schema({
  title: { type: String, required: true, minlength: 1 },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  body_paragraphs: [{ type: String, required: true, minlength: 1 }],
  body_images: [{ type: , required: false }],
  published: { type: Boolean, default: true }, // allow user to state whether they'd want to archive a post for later date publishing
  timestamp: { type: Date, default: Date.now() }, // if post is archived, timestamp will be the date of publishing
});


// virtual for post url
PostSchema.virtual("url").get(function () {
  return `/posts/${this._id}`;
});

// export post model
module.exports = mongoose.model("Post", PostSchema);
