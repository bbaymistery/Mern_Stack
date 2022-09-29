const app = require("./app");

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cloudinary = require("cloudinary");
//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error :${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception  `);
  process.exit(1);
});

//connect to database
connectDB();
//BUNU BURA YAZANNAN SONRA app.js e body parser ve  fileUploadu ekledik
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
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
