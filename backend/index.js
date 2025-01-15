const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectToDb } = require("./connect");

const goodsRoute = require("./routes/goodsRoute");
const measurementRoute = require("./routes/measurementRoute");
const purchaseRoute = require("./routes/purchaseRoute");
const reasonRoute = require("./routes/reasonRoute");
const roleRoute = require("./routes/roleRoute");
const statusRoute = require("./routes/statusRoute");
const storeRoute = require("./routes/storeRoute");
const supplierRoute = require("./routes/supplierRoute");
const typeRoute = require("./routes/typeRoute");
const userRoute = require("./routes/userRoute");
const withdrawRoute = require("./routes/withdrawRoute");
const categoryRoute = require("./routes/categoryRoute");

const app = express();

app.use(cors());
app.use(express.json());
connectToDb();
app.use("/goods", goodsRoute);
app.use("/measurement", measurementRoute);
app.use("/purchase", purchaseRoute);
app.use("/reason", reasonRoute);
app.use("/role", roleRoute);
app.use("/status", statusRoute);
app.use("/store", storeRoute);
app.use("/supplier", supplierRoute);
app.use("/type", typeRoute);
app.use("/user", userRoute);
app.use("/withdraw", withdrawRoute);
app.use("/category", categoryRoute);
// app.use(express.urlencoded({ extended: true }));/
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
