require('dotenv').config()
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
// const cloudinary = require("cloudinary");
const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors')
const path = require("path")
connectDB()
const app = express()
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}


app.use(express.json())
app.use(cors())
app.use(cookieParser())

//Route importings
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))

//middleware for error
app.get("/", (req, res) => {
    res.json({ msg: "dsassss" })
})
//port server running
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});