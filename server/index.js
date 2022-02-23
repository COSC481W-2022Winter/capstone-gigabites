//Credit to Code Base URL: https://www.youtube.com/watch?v=I7EDAR2GRVo

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const cors = require("cors");
const { port, db } = require('./config.json');
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const router = express.Router();
app.use("/",router);

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(`${db}`);
var compareResult;


app.post("/createUser", async (req, res) => {
  const user = req.body;
  //function to check if username exists 
  const existUsername = await UserModel.findOne({ username: req.body.username })
  if (existUsername) {
    console.log('username taken')
  }
  else {
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
  }
});

app.post("/passwordValidation", (req, res) => {
  console.log("Calling function");
  const output = req.body;
  console.log(output.password);
  console.log(output);

  UserModel.findOne({ username: output.username }, function (err, user) {  //Handle error if user does not exist in database
    
    if (err) {
      compareResult = false;
      return compareResult;
    }

    console.log('%s', user.password);
    hash = user.password;

    var password = output.password;
    bcrypt.compare(password, hash, function(err, result) {
      if (err) return handleError(err);
      console.log('passwordMatch: ' + result);

      compareResult = result;
    });
  });
});
  

app.get("/getPassStatus", (req, res) => {
  res.send(compareResult);
});

  
  //function to check if username exists 
  // const existUsername = await UserModel.findOne({ username: req.body.username})
  // if (existUsername){
  //   console.log('username taken')
  // }
  // else{
  // const newUser = new UserModel(user);
  // await newUser.save();
  // res.json(user);
  // }

app.listen(`${port}`, () => {
  console.log("SERVER RUNS PERFECTLY!");
  console.log(`Server running on port ${port}`);
});
