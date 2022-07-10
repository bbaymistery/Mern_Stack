const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes.js");
const tourRouter = require("./routes/tourRoute.js");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
//midleweares
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
//https://tour0pedia.herokuapp.com/
//https://tour0pedia-heroku-22.herokuapp.com
//routes
app.use("/users", userRouter); // http://localhost:5000/users/signup
app.use("/tour", tourRouter);

//importing Routes
app.get("/", (req, res) => {
  res.send("Welcome to tour API");
});

const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(
      "Mongo db connected " +
        " " +
        `${con.connection.host}:${con.connection.port}/${con.connection.name}`
    );
    app.listen(port, () => {
      console.log(`Server is running o port  ${port} `);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
