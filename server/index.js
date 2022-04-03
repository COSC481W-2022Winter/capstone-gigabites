//Credit to Code Base URL: https://www.youtube.com/watch?v=I7EDAR2GRVo

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const UserModel = require("./models/Users");
const RecipeModel = require("./models/Recipes");
const cors = require("cors");
const { port, db, editProfileRedirect } = require('./config.json');
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const router = express.Router();
app.use("/",router);

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// default options for file upload using express-fileupload
app.use(fileUpload());

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
    uniqueUser=false;
  }
  else {
    const newUser = new UserModel(user);
    await newUser.save();
    uniqueUser=true;
  }
});

{/*Verification response from server based on the unique state of username*/}
app.get("/getUnique", (req, res) => {
  res.send(uniqueUser);
});

{/*Adds recipe to database*/}
app.post("/addRecipes", async (req, res) => {
  const recipe = req.body;

  console.log(req.body);
  const newRecipe = new RecipeModel(recipe);
  console.log('Saving recipe....');
  await newRecipe.save();
  console.log('Recipe saved');
});

{/*Function to see if the password entered on the login page actually matches the encrypted username in the database*/}
app.post("/passwordValidation", (req, res) => {
  const output = req.body;
  console.log(output.password);
  console.log(output);

  UserModel.findOne({ username: output.username }, function (err, user) {
    
    console.log(user);
    if (err || user == null) {
      compareResult = false;
      res.send(compareResult);
    }
    else{
    hash = user.password;

    var password = output.password;
    bcrypt.compare(password, hash, function(err, result) {
      if (err) return handleError(err);
      console.log('passwordMatch: ' + result);
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


{/*Function to edit user profile*/}
app.post("/editUsers", async function(req,res)
{
  console.log(req.body)
  let sampleFile;
  let uploadPath;

  UserModel.findOne({ username: req.body.username }, async function (err, out) 
  {
    console.log(out);
    if (!req.files || Object.keys(req.files).length === 0) 
    {
      console.log("Uploaded no image");

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      if(req.body.password == '')
      {
        var editUser = {
          bio: req.body.bio,
          email: req.body.email,
          question: req.body.question,
          answer: req.body.answer
        };
      }
      else
      {
        var editUser = {
          bio: req.body.bio,
          email: req.body.email,
          password: hashedPassword,
          question: req.body.question,
          answer: req.body.answer
        };
      }
    }
    else
    {
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      sampleFile = req.files.sampleFile;
      
      let arr = sampleFile.name.split(".");
      let ext = arr.pop();
      sampleFile.name = out._id+"."+ext;

      uploadPath = '../client/src/pages/user_images/' + sampleFile.name;

      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv(uploadPath, function(err) {
        if (err)
          return res.status(500).send(err);
          console.log('File '+sampleFile.name+' uploaded!');
      });

      //At this point file has successfully been renamed with the id of the user, and uploaded to the server.

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      if(req.body.password == '')
      {
          var editUser = {
            bio: req.body.bio,
            email: req.body.email,
            profilePicture: out._id,
            profilePictureEXT: ext,
            question: req.body.question,
            answer: req.body.answer
          };
      }
      else
      {   
        var editUser = {
          bio: req.body.bio,
          profilePicture: out._id,
          profilePictureEXT: ext,
          email: req.body.email,
          password: hashedPassword,
          question: req.body.question,
          answer: req.body.answer
        };
      }
    }

    UserModel.findOneAndUpdate(
      { username: req.body.username }, 
      { $set: editUser },
    ).then(post => {});
  });

  res.writeHead(302, { Location: editProfileRedirect });
  res.end();
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


{/*Displays running state of server in console, along with the currently running port number*/}
app.listen(`${port}`, () => {
  console.log("SERVER RUNS PERFECTLY!");
  console.log(`Server running on port ${port}`);
});
