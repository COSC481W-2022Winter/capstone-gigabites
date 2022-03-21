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

//function to calculate total time 
// UserSchema.pre('save', async function (next) {
//   try{
//       this.totalTime = (this.preptime + this.bakingtime);
//       next();
//   } catch (error) {
//     next(error);
//   }
// });

const RecipeModel = mongoose.model("recipes", RecipeSchema);
module.exports = RecipeModel;
