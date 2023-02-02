require('dotenv').config()
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
// const cloudinary = require("cloudinary");
const express = require("express")
const SocketServer = require('./socketServer')
const cors = require('cors')
connectDB()
const app = express()



app.use(express.json())
app.use(cors())
app.use(cookieParser())
// Socket
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    // SocketServer(socket)
    // console.log(`${socket.id} ` + ' Connected');
    SocketServer(socket)

})

//Route importings
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/commentRouter'))
app.use('/api', require('./routes/notifyRouter'))

//middleware for error

//port server running
const PORT = 5000;
http.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});