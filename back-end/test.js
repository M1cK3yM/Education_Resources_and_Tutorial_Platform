require("dotenv").config();
const express = require("express");
const connectDB = require("./database");
const eventRoutes = require("./src/routes/eventRoute");
const userRoutes = require("./src/routes/user.route");
const bookmarkRoutes = require("./src/routes/bookmarkRoute");
const authRoutes = require("./src/routes/auth.route");
const adminRoutes = require("./src/routes/admin.route");

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use the event routes
app.use("/api/events", eventRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/users", userRoutes);
app.use("/", authRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server  running  port ${PORT}`);
});
