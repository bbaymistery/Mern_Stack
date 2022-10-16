import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();

const connectDB = async () => {
    try {
        //mongo db connection string
        const con = await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Mongo db connected " + " " +
            `${con.connection.host}:${con.connection.port}/${con.connection.name}`
        );
    } catch (err) {
        console.log(err);
        process.exit(1); //1=>true
    }
};


//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);//dahsboard
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(8800, () => { connectDB(); console.log("Connected to backend."); });
