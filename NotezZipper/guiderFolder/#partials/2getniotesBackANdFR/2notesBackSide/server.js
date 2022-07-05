const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const notes = require("./data/notes");
const app = express();
app.use(express.json());
dotenv.config();
connectDB();
app.get("/", (req, res) => {
  res.send("API UI running");
});

//routes
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server slis"));
/**
 app.get("/api/notes", (req, res) => {
  res.json(notes);
});
app.get("/api/notes/:id", (req, res) => {
  let id = req.params.id;
  let note = notes.find((not) => {
    return not._id === id;
  });
  res.json(note);
}); */
