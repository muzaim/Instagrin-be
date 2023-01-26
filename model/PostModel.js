const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Auth",
    },
    caption: {
      type: String,
    },
    location: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel;
