//Credit to Code Base URL: https://www.youtube.com/watch?v=I7EDAR2GRVo

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
