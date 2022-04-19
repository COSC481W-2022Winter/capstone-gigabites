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
    type: Number,
  },
  amountperserving: {
    type: Number,
  },
  amountperservingunit: {
    type: String,
  },
  totaltime: {
    type: Number,
    default: 0
  },
  preptime: {
    type: Number,
    default: 0,
  },
  preptimeunit: {
    type: String,
  },
  bakingtime: {
    type: Number,
    default: 0,
  },
  bakingtimeunit: {
    type: String,
  },
  cooktime: {
    type: Number,
    default: 0,
  },
  cooktimeunit: {
    type: String,
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
  },
});

const RecipeModel = mongoose.model("recipes", RecipeSchema);
module.exports = RecipeModel;
