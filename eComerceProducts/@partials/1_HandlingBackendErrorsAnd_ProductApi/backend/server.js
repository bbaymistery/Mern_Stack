const dotenv = require("dotenv");

const app = require("./app");
const connectDB = require("./config/db");

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error :${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception  `);
  process.exit(1);
});

//connect to database
connectDB();

//config
dotenv.config({ path: "backend/config/config.env" });

//port server running
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running oon port ${PORT}`);
});

//Unhandled Promise Rejection ()
process.on("unhandledRejection", (err) => {
  console.log(`Error :${err.message}`);
  console.log(
    `Shutting down the server due to Unhandled Promise   Rejection  `
  );
  server.close(() => {
    process.exit(1);
  });
});
