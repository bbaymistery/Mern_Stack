const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(
            "Mongo db connected " +
            " " +
            `${con.connection.host}:${con.connection.port}/${con.connection.name}`
        );
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = connectDB