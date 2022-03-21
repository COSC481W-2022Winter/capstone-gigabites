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
    type: String,
  },
  preptime: {
    type: String,
  },
  bakingtime: {
    type: String,
  }
});

const RecipeModel = mongoose.model("recipes", RecipeSchema);
module.exports = RecipeModel;
