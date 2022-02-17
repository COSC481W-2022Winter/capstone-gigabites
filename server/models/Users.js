//Credit to Code Base URL: https://www.youtube.com/watch?v=I7EDAR2GRVo

//A model used to keep the document records in the database consistent
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
  },
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
  bio: {
    type: String,
    default:'This is my awesome default bio',
  },
  profilePicture: {
    type: String,
    default: '/root/capstone-gigabites/client/public/A.png',
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
