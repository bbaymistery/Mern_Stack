import mongoose from "mongoose";

export default async function connect() {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.ATLAS_URI)
    console.log("Database Connected")
    // try {
    //     const con = await mongoose.connect(process.env.ATLAS_URI, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //     })
    //     console.log(
    //         "Mongo db connected " +
    //         " " +
    //         `${con.connection.host}:${con.connection.port}/${con.connection.name}`
    //     );
    // } catch (error) {
    //     console.log(error)
    //     process.exit(1)
    // }
}