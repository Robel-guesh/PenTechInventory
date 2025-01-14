const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectToDb } = require("./connect");
const goodsRoute = require("./routes/goodsRoute");
const app = express();
app.use(cors());
connectToDb();
app.use("/goods", goodsRoute);
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));/
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
