//Credit to Code Base URL: https://www.youtube.com/watch?v=I7EDAR2GRVo

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const cors = require("cors");
const {port, db, user, pass, from, subject} = require('./config.json');
var nodemailer = require('nodemailer');

app.use(express.json());
app.use(cors());

mongoose.connect(`${db}`);

//Start of connection to email servers
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: (`${user}`),
    pass: (`${pass}`)
  }
});

var mailOptions = {
  from: `${from}`,
  to: `deliveritthere@gmail.com`,  //Set to email me (Brendan) for the time being until we get this setup
  subject: `Password Reset`,
  text: 'This is an outgoing email from the server application of our capstone project for COSC 481W located on the Gigabites domain.account.  Hope you enjoy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
//End of connection to email servers... And Email successfully sent



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
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(`${port}`, () => {
  console.log("SERVER RUNS PERFECTLY!");
  console.log(`Server running on port ${port}`);
});
