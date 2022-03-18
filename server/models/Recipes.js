//A model used to keep the recipe records in the database consistent

const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    prepTime: {
      type: Int,
    },
    cookTime: {
      type: Int,
    },
    totalTime: {
        type: Int,
      }
  });
//function to calculate total time 
  UserSchema.pre('save', async function (next) {
    try{
        this.totalTime = (this.prepTime + this.cookTime);
        next();
    } catch (error) {
      next(error);
    }
  });
  
  const RecipeModel = mongoose.model("recipes", RecipeSchema);
  module.exports = RecipeModel;