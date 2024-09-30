require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const eventRoutes = require("./src/routes/eventRoute");
const userRoutes = require("./src/routes/user.route");
const bookmarkRoutes = require("./src/routes/bookmarkRoute");
const authRoutes = require("./src/routes/auth.route");
const adminRoutes = require("./src/routes/admin.route");
const rsvpRoutes = require("./src/routes/rsvpRoute");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:52806/eduDB?directConnection=true",
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

connectDB();

// Use the event routes
app.use("/api/events", eventRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/users", userRoutes);
app.use("/", authRoutes);
app.use("/admin", adminRoutes);
app.use("/", rsvpRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server  running  port ${PORT}`);
});
