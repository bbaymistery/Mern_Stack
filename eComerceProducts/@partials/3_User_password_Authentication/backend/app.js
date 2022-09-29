const express = require("express");
const path = require("path");
const errorMiddlewate = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
//Using midllewares
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
//Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);

//midleware for errors
app.use(errorMiddlewate);
module.exports = app;
