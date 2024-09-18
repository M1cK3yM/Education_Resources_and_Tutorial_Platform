require("dotenv").config();
const express = require("express");
const connectDB = require("./database");
const cookieParser = require("cookie-parser");
const routes = require("./src/routes");
const cors = require("cors");
const useragent = require("express-useragent");
const { deleteInactiveSessions } = require("./src/middleware/cronJob");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(useragent.express());

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS.split(","),
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
// Connect to MongoDB
connectDB();

deleteInactiveSessions();

// Use the event routes
app.use("/api/events", routes.eventRoutes);
app.use("/api/news", routes.newsRoutes);
app.use("/api/resources", routes.resourceRoutes);
app.use("/api/universities", routes.universitiesRoutes);
app.use("/api/ratings", routes.ratingRoutes);
app.use("/api/bookmarks", routes.bookmarkRoutes);
app.use("/api/users", routes.userRoutes);
app.use("/", routes.authRoutes);
app.use("/admin", routes.adminRoutes);
app.use("/api/events/rsvp", routes.rsvpRoutes);
app.use("/api/archived-events", routes.archivedRoutes);
app.use("/search", routes.searchRoute);

//Serving uploaded file
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server  running  port ${PORT}`);
});
