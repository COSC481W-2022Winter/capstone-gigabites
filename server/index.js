//Credit to Code Base URL: https://www.youtube.com/watch?v=I7EDAR2GRVo

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const cors = require("cors");
const {port, db} = require('./config.json');

app.use(express.json());
app.use(cors());

mongoose.connect(`${db}`);

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  //function to check if username exists 
  const existUsername = await UserModel.findOne({ username: req.body.username})
  if (existUsername){
    console.log('username taken')
  }
  else{
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user);
  }
});

app.listen(`${port}`, () => {
  console.log("SERVER RUNS PERFECTLY!");
  console.log(`Server running on port ${port}`);
});
