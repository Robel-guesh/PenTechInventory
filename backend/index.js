const express = require("express");
const withdrawRoute = require("./routes/withdrawRoute"); // Import withdraw routes
const typeRoute = require("./routes/typeRoute");
//const userRoute = require("./routes/userRoute");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const MONGO_API = process.env.MONGO_API;
const COLLECTION = process.env.COLLECTION;
app.use(cors());
app.use(express.json());
app.use("/api", withdrawRoute); // Use withdraw routes under the /api path
app.use("/api", typeRoute);
//app.use("/api", userRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
mongoose
  .connect(`${MONGO_API}${COLLECTION}`)
  .then(() => {
    console.log(`successfully connected to MongoDB`);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
