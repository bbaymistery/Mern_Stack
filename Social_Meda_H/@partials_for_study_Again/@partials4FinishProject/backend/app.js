const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//Using midllewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
//importing Routes
const postRoute = require("./routes/postRoutes");
const userRoute = require("./routes/userRoutes");

//using Routes
app.use("/api/v1", postRoute);
app.use("/api/v1", userRoute);

module.exports = app;
