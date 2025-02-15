// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const { connectToDb } = require("./connect");

// const goodsRoute = require("./routes/goodsRoute");
// const measurementRoute = require("./routes/measurementRoute");
// const purchaseRoute = require("./routes/purchaseRoute");
// const reasonRoute = require("./routes/reasonRoute");
// const roleRoute = require("./routes/roleRoute");
// const statusRoute = require("./routes/statusRoute");
// const storeRoute = require("./routes/storeRoute");
// const supplierRoute = require("./routes/supplierRoute");
// const typeRoute = require("./routes/typeRoute");
// const userRoute = require("./routes/userRoute");
// const withdrawRoute = require("./routes/withdrawRoute");
// const categoryRoute = require("./routes/categoryRoute");
// const auth = require("./middleware/auth");
// const app = express();

// app.use(cors());
// app.use(express.json());
// connectToDb();
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/goods", auth, goodsRoute);
// app.use("/measurement", auth, measurementRoute);
// app.use("/purchase", auth, purchaseRoute);
// app.use("/reason", auth, reasonRoute);
// app.use("/role", auth, roleRoute);
// app.use("/status", auth, statusRoute);
// app.use("/store", auth, storeRoute);
// app.use("/supplier", auth, supplierRoute);
// app.use("/type", auth, typeRoute);
// app.use("/user", userRoute);

// app.use("/withdraw", auth, withdrawRoute);
// app.use("/category", auth, categoryRoute);
// // app.use(express.urlencoded({ extended: true }));/

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectToDb } = require("./connect");
const socketIo = require("socket.io"); // Import Socket.IO

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
const auth = require("./middleware/auth");

const app = express();

// Enable CORS and JSON parsing
app.use(cors());

app.use(express.json());
connectToDb();

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/goods", auth, goodsRoute);
app.use("/measurement", auth, measurementRoute);
app.use("/purchase", auth, purchaseRoute);
app.use("/reason", auth, reasonRoute);
app.use("/role", auth, roleRoute);
app.use("/status", auth, statusRoute);
app.use("/store", auth, storeRoute);
app.use("/supplier", auth, supplierRoute);
app.use("/type", auth, typeRoute);
app.use("/user", userRoute);
app.use("/withdraw", withdrawRoute);
app.use("/category", auth, categoryRoute);

// Start the server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
