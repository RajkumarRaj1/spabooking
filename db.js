const mongoose = require("mongoose");

const mongoDBURI = "mongodb://localhost:27017/spaBookings";

async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoDBURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = {
    connectToMongoDB
}