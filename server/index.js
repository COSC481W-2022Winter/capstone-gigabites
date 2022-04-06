//Credit to Code Base URL: https://www.youtube.com/watch?v=I7EDAR2GRVo

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const RecipeModel = require("./models/Recipes");
const IngredientModel = require("./models/Ingredients");
const cors = require("cors");
const { port, db, temp } = require('./config.json');
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
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
var IDofRecipe;


// default options for file upload using express-fileupload
app.use(fileUpload());

app.post('/uploads', async function(req, res) {

  const recipe = req.body;
  let sampleFile;
  let uploadPath;

  const names = (v) => [].concat(v).map(name => name.toString());
  
  const ingredientsarray = names(recipe.ingredient);
  const measurementarray = names(recipe.measurement);
  const unitsarray = names(recipe.units);
  
  const newRecipe = new RecipeModel(recipe);
  await newRecipe.save(function(err, out)
  {
    IDofRecipe = out._id.toString();


    if (!req.files || Object.keys(req.files).length === 0) {
      
      for(var j=0; j<ingredientsarray.length; j++)
      {
        var ingredientObject = {
          recipeID: out._id.toString(),
          name: ingredientsarray[j],
          measurement: measurementarray[j],
          units: unitsarray[j]
        };
        
        const newIngredient = new IngredientModel(ingredientObject);
        newIngredient.save(function(err, result)
        {
          if(err)
            console.log("Ingredient Upload Error");
        });
      }

      res.writeHead(302, { Location: temp });
      res.end();

    }
    else
    {
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      sampleFile = req.files.sampleFile;
      
      let arr = sampleFile.name.split(".");
      let ext = arr.pop();
      sampleFile.name = out._id+"."+ext;
      uploadPath = '../client/src/pages/recipe_images/' + sampleFile.name;

      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv(uploadPath, function(err) {
        if (err)
          return res.status(500).send(err);
          console.log('File '+sampleFile.name+' uploaded!');
      });

      var editRecipe = {
        recipePicture: out._id,
        recipePictureEXT: ext
      };
      
      RecipeModel.findOneAndUpdate(
        { _id: out._id }, 
        { $set: editRecipe },
      ).then(post => {
      });

      for(var j=0; j<ingredientsarray.length; j++)
      {
        var ingredientObject = {
          recipeID: out._id.toString(),
          name: ingredientsarray[j],
          measurement: measurementarray[j],
          units: unitsarray[j]
        };
        
        const newIngredient = new IngredientModel(ingredientObject);
        newIngredient.save(function(err, result)
        {
          if(err)
            console.log("Ingredient Upload Error");
        });
      }

      res.writeHead(302, { Location: temp });
      res.end();

    }
  });
});


{/*Function to get recipes from recipes collection based on RecipeID*/}
app.get("/getRecipeByIDs", async (req, res) => {
  res.send(IDofRecipe);
 });




{/*Verification request from front-end client to see if the username entered on the signup page is unique or not*/}
app.post("/createUser", async (req, res) => {
  const user = req.body;
  
  if(user.password == '')
    return;
  //function to check if username exists 
  const existUsername = await UserModel.findOne({ username: req.body.username })
  if (existUsername) {
    //console.log(`Username ${user.username} already in use!  Rejecting user entry`)
    res.send(false);
  }
  else {
    const newUser = new UserModel(user);
    await newUser.save();
    res.send(true);
  }
});


{/*Function to get recipes from recipes collection based on RecipeID*/}
app.post("/getRecipeByRecipeIDs", (req, res) => {
  const output = req.body;

  RecipeModel.find({_id: output.id }, function(err, recipe) 
  {
    if (err)
      res.send(false);
    else
      res.send(recipe);

    //console.log(recipe);
  });
});



{/*Adds ingredients to database*/}
app.post("/ingredientsUpload", async (req, res) => {
  const ingredient = req.body;

  console.log("ingredientsUpload"+req.body);
  const newIngredient = new IngredientModel(ingredient);
  await newIngredient.save(function(err, out)
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
      //console.log(output.username+' passwordMatch: ' + result);

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
  const output = req.body.username;

  RecipeModel.find({username: output }, function(err, recipe) 
  {
    if (err)
      res.send(false);

    res.send(recipe);
  }).limit(5);
});


{/*Function to get recipes from recipes collection based on username*/}
app.post("/getLastRecipes", (req, res) => {
  const output = req.body.username;

  RecipeModel.find({username: output }, function(err, recipe) 
  {
    if (err)
      res.send(false);
    //console.log(JSON.stringify(recipe));
    res.send(recipe);
  }).limit(1).sort({$natural:-1})
});



{/*Displays running state of server in console, along with the currently running port number*/}
app.listen(`${port}`, () => {
  console.log("SERVER RUNS PERFECTLY!");
  console.log(`Server running on port ${port}`);
});