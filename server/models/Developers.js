//A model used to keep the document records in the database consistent for Developers
const mongoose = require("mongoose");

const DeveloperSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  role: {
    type: String,
  },
  bio: {
    type: String,
  },
  githubURL: {
    type: String,
  }
});

const DeveloperModel = mongoose.model("developers", DeveloperSchema);
module.exports = DeveloperModel;