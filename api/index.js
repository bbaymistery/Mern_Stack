const errorMiddleware = require("./middlewares/error");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cloudinary = require("cloudinary");
const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors')
const app = express()
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
dotenv.config()
connectDB()

//middlewares
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Route importings
const product = require("./routes/productsRoutes");
const order = require("./routes/orderRoutes");
const user = require("./routes/userRoutes");
const payment = require("./routes/paymentRoutes")
app.use("/api/v1", product)
app.use("/api/v1", order)
app.use("/api/v1", user)
app.use("/api/v1", payment)

//middleware for error
app.use(errorMiddleware)


//port server running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});