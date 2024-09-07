const mongoose = require("mongoose");

const mongoURI = `${process.env.MONGODB_URI}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}?directConnection=true`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
