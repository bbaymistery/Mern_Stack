const express = require("express");
const path = require("path");
const errorMiddlewate = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
require("dotenv").config({ path: "backend/config/config.env" });

//Using midllewares
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
//Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//midleware for errors
app.use(errorMiddlewate);
module.exports = app;
