const mongoose = require("mongoose");
const colors = require('colors')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URi, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongo connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log("error: " + err.red.bold);
    process.exit();
  }
};

module.exports = connectDB;
