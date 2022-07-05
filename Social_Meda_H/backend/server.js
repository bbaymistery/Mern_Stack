const app = require("./app");
const connectDB = require("./config/db");
const cloudinary = require("cloudinary");
connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running oon port ${PORT}`);
});

//14.47 https://www.youtube.com/watch?v=mKvwVv1XHx4&list=PLt5mNkGuWcuUxJh2HNi1OcuhZWpj-xI5S&index=6
