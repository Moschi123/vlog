const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb+srv://francoeduardo500:ptbAYOkgU05d1b8n@cluster0.1hehvba.mongodb.net/blog", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error); // Corrected 'err' to 'error'
   
  }
};

module.exports = {
  dbConnection,
};