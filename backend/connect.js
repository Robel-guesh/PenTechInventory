const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_API = process.env.MONGO_API;
const COLLECTION = process.env.COLLECTION;

function connectToDb() {
  mongoose
    .connect(`${MONGO_API}${COLLECTION}`, {})
    .then(() => {
      console.log("Connected to MongoDB successfully.");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:");
    });
}
module.exports = { connectToDb };
