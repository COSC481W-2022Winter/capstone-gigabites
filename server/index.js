//Credit to Code Base URL: https://www.youtube.com/watch?v=I7EDAR2GRVo

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const RecipeModel = require("./models/Recipes");
const DeveloperModel = require("./models/Developers");
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

{/*Sets up connection to MongoDB database using mongoose library*/}
mongoose.connect(`${db}`);

{/*Defines variables for later use*/}
var compareResult;
var uniqueUser;

{/*Verification request from front-end client to see if the username entered on the signup page is unique or not*/}
app.post("/createUser", async (req, res) => {
  const user = req.body;
  
  if(user.password == '')
    return;
  //function to check if username exists 
  const existUsername = await UserModel.findOne({ username: req.body.username })
  if (existUsername) {
    console.log(`Username ${user.username} already in use!  Rejecting user entry`)
    res.send(false);
  }
  else {
    const newUser = new UserModel(user);
    await newUser.save();
    res.send(true);
  }
});

{/*Adds recipe to database*/}
app.post("/addRecipes", async (req, res) => {
  const recipe = req.body;

  console.log(req.body);
  const newRecipe = new RecipeModel(recipe);
  await newRecipe.save(function(err, out)
    {res.send(out);});
});

{/*Function to see if the password entered on the login page actually matches the encrypted username in the database*/}
app.post("/passwordValidation", (req, res) => {
  const output = req.body;

  UserModel.findOne({ username: output.username }, function (err, user) {
    
    if (err || user == null) {
      compareResult = false;
      res.send(compareResult);
    }
    else{
    hash = user.password;

    var password = output.password;
    bcrypt.compare(password, hash, function(err, result) {
      if (err) return handleError(err);
      console.log(output.username+' passwordMatch: ' + result);

      compareResult = result;
      res.send(compareResult);
    });
  }
  });
});


{/*Function to getUser from database based on username*/}
app.post("/getUsers", (req, res) => {
  const output = req.body;

  UserModel.findOne({ username: output.username }, function (err, user) {
    
    console.log(user);
    if (err || user == null) {
      compareResult = false;
      res.send(compareResult);
    }
    else{
      res.send(user);
    }
  });
});

{/*Function to get recipes from recipes collection based on username*/}
app.post("/getRecipes", (req, res) => {
  const output = req.body;
  console.log(output);

  RecipeModel.find({username: output.username }, function(err, recipe) 
  {
    if (err)
    {
      res.send(false);
    }
    res.send(recipe);
  });
});

{/*Function to get developers from developers collection*/}
app.post("/getDevelopers", (req, res) => {
  const output = req.body;
  console.log(output);

  DeveloperModel.find({}, function(err, developer) 
  {
    if (err)
    {
      console.log(developer);
    }
    res.send(developer);
  });
});


{/*Displays running state of server in console, along with the currently running port number*/}
app.listen(`${port}`, () => {
  console.log("SERVER RUNS PERFECTLY!");
  console.log(`Server running on port ${port}`);
});
