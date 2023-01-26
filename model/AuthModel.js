const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let AuthSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
});

const AuthModel = mongoose.model("Auth", AuthSchema);
module.exports = AuthModel;
