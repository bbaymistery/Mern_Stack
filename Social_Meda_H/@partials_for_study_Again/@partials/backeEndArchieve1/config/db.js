const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    //mongo db connection string
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      "Mongo db connected " +
        " " +
        `${con.connection.host}:${con.connection.port}/${con.connection.name}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1); //1=>true
  }
};

module.exports = connectDB;
