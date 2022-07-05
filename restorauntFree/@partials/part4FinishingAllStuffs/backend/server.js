const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const restaurantsRoute = require("./routes/restaurants.route");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/restaurants", restaurantsRoute);
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found " });
});

console.log("app");

module.exports = app;
