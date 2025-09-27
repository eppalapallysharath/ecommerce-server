const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.port;
const { connectDB } = require("./config/db.js");
connectDB();
const productRoute = require("./routes/productRoute.js");
const userRoute = require("./routes/userRoutes.js");
const cartRoute = require("./routes/cartRoutes.js")

app.use(express.json());
app.use(express.urlencoded(true));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/products", productRoute);
app.use("/users/", userRoute);
app.use("/cart", cartRoute )

app.listen(port, () => {
  console.log("server started on " + port);
});
