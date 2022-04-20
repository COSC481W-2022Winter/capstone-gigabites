//Credit to Code Base URL: https://www.youtube.com/watch?v=I7EDAR2GRVo

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const DeveloperModel = require("./models/Developers");
const IngredientModel = require("./models/Ingredients");
const UserModel = require("./models/Users");
const RecipeModel = require("./models/Recipes");
const cors = require("cors");
const { port, db, clientAddress, pass } = require('./config.json');
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const router = express.Router();
var nodemailer = require('nodemailer');

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


// used for recipe searching
var searchText;
var searchType;       // can either be recipe name or username.


// default options for file upload using express-fileupload
app.use(fileUpload());

app.post('/uploadRecipe', async function(req, res) {

  const recipe = req.body;
  let sampleFile;
  let uploadPath;
  let calculatedtotaltime = 0;
  
  const names = (v) => [].concat(v).map(name => name.toString());

  const ingredientsarray = names(recipe.ingredient);
  const measurementarray = names(recipe.measurement);
  const unitsarray = names(recipe.units);
  
  const newRecipe = new RecipeModel(recipe);
  await newRecipe.save(function(err, out)
  {
    IDofRecipe = out._id.toString();

    if(out.bakingtimeunit==='minutes')
      tempBakingTime=parseInt(out.bakingtime);
    else
      tempBakingTime= (parseInt(out.bakingtime)*60);


    if(out.preptimeunit==='minutes')
      tempPrepTime=parseInt(out.preptime);
    else
      tempPrepTime= (parseInt(out.preptime)*60);


    if(out.cooktimeunit==='minutes')
      tempCookTime=parseInt(out.cooktime);
    else
      tempCookTime= (parseInt(out.cooktime)*60);


    calculatedtotaltime += tempBakingTime; 
    calculatedtotaltime += tempCookTime;  
    calculatedtotaltime += tempPrepTime;

    var editRecipe = {
      totaltime: calculatedtotaltime
    };

    RecipeModel.findOneAndUpdate(
      { _id: IDofRecipe }, 
      { $set: editRecipe },
    ).then(post => {console.log('Successfully updated recipe')});


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
    }
    
    res.writeHead(302, { Location: clientAddress+"RecipeRedirect" });
    res.end();
  });
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
  });
});


{/*Verification request from front-end client to see if the username entered on the signup page is unique or not*/}
app.post("/createUser", async (req, res) => {
  const user = req.body;
  
  if(user.password == '')
    return;
  //function to check if username exists 
  const existUsername = await UserModel.findOne({ username: req.body.username })
  if (existUsername) {
    res.send(false);
  }
  else {
    const newUser = new UserModel(user);
    await newUser.save();
    res.send(true);
  }
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


{/*Function to edit user profile*/}
app.post("/editUsers", async function(req,res)
{
  let sampleFile;
  let uploadPath;

  UserModel.findOne({ username: req.body.username }, async function (err, out) 
  {
    if (!req.files || Object.keys(req.files).length === 0) 
    {
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

  res.writeHead(302, { Location: clientAddress+"editProfileTransition" });
  res.end();
});



{/*Function to get recipes from recipes collection based on username*/}
app.post("/editRecipe", (req, res) => {
  const output = req.body;
 
  let calculatedtotaltime = 0;
  let tempCookTime, tempPrepTime, tempBakingTime;

  if(output.bakingtimeunit==='minutes')
    tempBakingTime=parseInt(output.bakingtime);
  else
    tempBakingTime= (parseInt(output.bakingtime)*60);


  if(output.preptimeunit==='minutes')
    tempPrepTime=parseInt(output.preptime);
  else
    tempPrepTime= (parseInt(output.preptime)*60);


  if(output.cooktimeunit==='minutes')
    tempCookTime=parseInt(output.cooktime);
  else
    tempCookTime= (parseInt(output.cooktime)*60);


  calculatedtotaltime += tempBakingTime; 
  calculatedtotaltime += tempCookTime;  
  calculatedtotaltime += tempPrepTime;

  if (!req.files || Object.keys(req.files).length === 0) 
  {
    var editRecipe = {
      name: output.name,
      description: output.description,
      directions: output.directions,
      servingsize: output.servingsize,
      amountperserving: output.amountperserving,
      amountperservingunit: output.amountperservingunit,
      preptime: output.preptime,
      preptimeunit: output.preptimeunit,
      cooktime: output.cooktime,
      cooktimeunit:output.cooktimeunit,
      bakingtime: output.bakingtime,
      bakingtimeunit: output.bakingtimeunit,
      totaltime: calculatedtotaltime
    };
  }
  else
  {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    
    let arr = sampleFile.name.split(".");
    let ext = arr.pop();
    sampleFile.name = output.id+"."+ext;

    uploadPath = '../client/src/pages/recipe_images/' + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
        console.log('File '+sampleFile.name+' uploaded!');
    });

    //At this point file has successfully been renamed with the id of the user, and uploaded to the server.

    var editRecipe = {
      name: output.name,
      description: output.description,
      directions: output.directions,
      servingsize: output.servingsize,
      amountperserving: output.amountperserving,
      amountperservingunit: output.amountperservingunit,
      preptime: output.preptime,
      preptimeunit: output.preptimeunit,
      cooktime: output.cooktime,
      cooktimeunit:output.cooktimeunit,
      bakingtime: output.bakingtime,
      bakingtimeunit: output.bakingtimeunit,
      recipePicture: output.id,
      recipePictureEXT: ext,
      totaltime: calculatedtotaltime
    };
  }

  RecipeModel.findOneAndUpdate(
    { _id: output.id }, 
    { $set: editRecipe },
  ).then(post => {console.log('Successfully updated recipe')});

    IngredientModel.deleteMany({recipeID: output.id}, function(err, result) {
      if(err)
        res.send(err);

      console.log(result);
    });

    const names = (v) => [].concat(v).map(name => name.toString());

    const ingredientsarray = names(output.ingredient);
    const measurementarray = names(output.measurement);
    const unitsarray = names(output.units);

  for(var j=0; j<ingredientsarray.length; j++)
  {
    var ingredientObject = {
      recipeID: output.id.toString(),
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

  res.writeHead(302, { Location: clientAddress+"recipe/"+output.id });
  res.end();
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
      
    res.send(recipe);
  }).limit(1).sort({$natural:-1})
});


{/*Function to get recipes from recipes collection based on username*/}
app.post("/ExploreLastRecipes", (req, res) => {

  RecipeModel.find({}, function(err, recipe) 
  {
    if (err)
      res.send(false);
    res.send(recipe);
  }).limit(10).sort({_id:-1})
});


/*
 * Function is called when user submits a recipe search via the home page.
 * Function gets the search type and search text and redirects to the recipe
 * search page.
 */ 
app.post("/recipeSearchRedirect", async function(req,res)
{
  searchType = req.body.searchType;
  searchText = req.body.searchText;

  res.writeHead(302, { Location: clientAddress+"SearchResult" });
  res.end();
});


/* 
 * Called when user is redirected to recipe search page. 
 * Using the searchText and searchType, search the recipe table
 * for all recipes that closely match the searchText. Send the
 * recipe(s) name, description, username, and recipe-picture.ext back to
 * recipe search page.
 * 
 * Credit for how to get approximate search:
 *  https://stackoverflow.com/a/26814550
 */
app.post("/recipeSearch", async function(req,res)
{
  if(searchType === "name")
  {
    RecipeModel.find (
      {name: { "$regex": searchText, "$options": "i" }}, 
      'name description username recipePicture recipePictureEXT',
      function (err, recipes) {
        if (err)
          res.send(false);

        res.send(recipes);
      }
    );
  }
  else  // search type is username.
  {
    RecipeModel.find (
      {username: { "$regex": searchText, "$options": "i" }}, 
      'name description username recipePicture recipePictureEXT',
      function (err, recipes) {
        if (err)
          res.send(false);

        res.send(recipes);
      }
    );
  }
});


{/*Function to get ingredients from collection based on the recipeID of the recipe*/}
app.post("/getIngredientsByRecipeID", (req, res) => {
  const output = req.body.recipeID

  IngredientModel.find({recipeID: output }, function(err, ingredients) 
  {
    if (err)
      res.send(false);
    
    res.send(ingredients);
  });
});


{/*Function to get developers from developers collection*/}
app.post("/getDevelopers", (req, res) => {
  const output = req.body;

  DeveloperModel.find({}, function(err, developer) 
  {
    res.send(developer);
  });
});


{/*Function to connect to email servers, and send user recovery code based on the users username*/}
{/*PLEASE NOTE THAT THIS FUNCTION WILL ONLY WORK ON THE MAIN SERVER*/}
app.post("/emailReset", async (req, res) => {
  const output = req.body;

  UserModel.findOne({ username: output.username }, function (err, result) {
    if (err || result == null) 
    {
      //If user entered username does not match any results in the database, return false and do not continue
      res.send(false);
    }
    else
    {
      //Start of connection to email servers and setup credientials to connect to gmail servers
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: ("COSC481GigaBites@gmail.com"),
          pass: (`${pass}`)
        }
      });

      //Sets up mailOptions and parameters before sending email
      var mailOptions = {
        from: "COSC481GigaBites@gmail.com",
        to: result.email,
        subject: "Password Reset",
        html: ('<p>Hello '+result.name+', Your recovery code is: '+result.recoveryCode +"</p>Sincerely,<br/>GigaBites.org")
      };

      //Sends the actual email using the above mailOptions
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Password Reset email sent to: '+ result.email);
          console.log('Email sent: ' + info.response);
        }
      });
      res.send(true);
    }
  });
});


{/*Function to verify username, reset password and change users recoveryCode if emailed code matches stored code*/}
app.post("/passwordResetBackend", async (req, res) => {
  const output = req.body;

  UserModel.findOne({ username: output.username }, async function (err, result) {
    
    if (err || result == null) 
    {
      //If user entered username does not match any results in the database, return false and do not continue
      res.send(false);
    }
    else
    {
      //Encrypts new password before entering it into database
      const salt = await bcrypt.genSalt(10);
      const newpassword = await bcrypt.hash(output.password, salt);
      if(output.recoveryCode==result.recoveryCode)
      {
        //Updates RecoveryCode with new random number string
        const newRecoveryCode = (Math.floor(Math.random() * (9999999 - 1000000) + 1000000)); 

        //Creates editUser object similar to when we edit user profiles
        var editUser = {
          password: newpassword,
          recoveryCode: newRecoveryCode
        };

        //Find user based on unique username, and update the variables set in the editUser object above
        UserModel.findOneAndUpdate(
          { username: output.username }, 
          { $set: editUser },
        ).then(post => {});

        //Reply back to the frontend that the password was successfully changed and the 
        res.send(true);
      }
      else //If saved recoveryCode does not match entered RecoveryCode, return false (invalid recoveryCode entry)
      {
        res.send(false);
      }
    }
  });
});


{/*Displays running state of server in console, along with the currently running port number*/}
app.listen(`${port}`, () => {
  console.log("SERVER RUNS PERFECTLY!");
  console.log(`Server running on port ${port}`);
});