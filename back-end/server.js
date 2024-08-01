require("dotenv").config();
const express = require("express");
const connectDB = require("./database");
const cookieParser = require("cookie-parser");
const routes = require("./src/routes");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Use the event routes
app.use("/api/events", routes.eventRoutes);
app.use("/api/news", routes.newsRoutes);
app.use("/api/resources", routes.resourceRoutes);
app.use("/api/bookmarks", routes.bookmarkRoutes);
app.use("/api/users", routes.userRoutes);
app.use("/", routes.authRoutes);
app.use("/admin", routes.adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server  running  port ${PORT}`);
});
