const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
// const cloudinary = require("cloudinary");
const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors')
const path = require("path")
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

//Route importings
app.use('/api', require('./routes/authRouter'))

//middleware for error
app.get("/", (req, res) => {
    res.json({ msg: "dsassss" })
})

//port server running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});