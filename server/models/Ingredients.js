//A model used to keep the document records in the database consistent for recipes
const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  recipeID: {
    type: String,
  },
  name: {
    type: String,
  },
  measurement: {
    type: Number,
    default: 0,
  },
  units: {
    type: String,
    default: "none",
  }
});

const IngredientModel = mongoose.model("ingredients", IngredientSchema);
module.exports = IngredientModel;