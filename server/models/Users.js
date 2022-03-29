//Credit to Code Base URL: https://www.youtube.com/watch?v=I7EDAR2GRVo

//A model used to keep the document records in the database consistent
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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
    default: 'default',
  },
  profilePictureEXT: {
    type: String,
    default: 'gif',
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function (next) {
  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
