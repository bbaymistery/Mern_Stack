const express = require("express");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());

//routes
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
// --------------------------deployment------------------------------

// --------------------------deployment------------------------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server slis"));
