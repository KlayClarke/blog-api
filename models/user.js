let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  firstname: { type: String, required: true, minlength: 1 },
  lastname: { type: String, required: true, minlength: 1 },
  username: { type: String, required: true, minlength: 1 },
  admin: { type: Boolean, default: false },
});

// virtual for user post portfolio url
UserSchema.virtual("url").get(function () {
  return `/users/${this._id}`;
});

//export user model
module.exports = mongoose.model("User", UserSchema);
