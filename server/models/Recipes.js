//A model used to keep the document records in the database consistent for recipes
const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  directions: {
    type: String,
  },
  servingsize: {
    type: String,
  },
  totaltime: {
    type: Number,
  },
  preptime: {
    type: Number,
  },
  bakingtime: {
    type: Number,
  },
  username: {
    type: String,
  },
  recipePicture: {
    type: String,
    default: "default2"
  },
  recipePictureEXT: {
    type: String,
    default: "png"
  }
});

//function to calculate total time 
RecipeSchema.pre('save', async function (next) {
  try{
      this.totaltime = (this.preptime + this.bakingtime);
      next();
  } catch (error) {
    next(error);
  }
});

const RecipeModel = mongoose.model("recipes", RecipeSchema);
module.exports = RecipeModel;
