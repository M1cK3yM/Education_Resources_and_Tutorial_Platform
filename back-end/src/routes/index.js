const adminRoutes = require("./admin.route");
const authRoutes = require("./auth.route");
const bookmarkRoutes = require("./bookmarkRoute");
const eventRoutes = require("./eventRoute");
const newsRoutes = require("./news.route");
const resourceRoutes = require("./resourceRoute");
const userRoutes = require("./user.route");
const universitiesRoutes = require("./universitiesRoute");
const ratingRoutes = require("./ratingRoute");
const rsvpRoutes = require("./rsvpRoute");
const archivedRoutes = require("./archivedEventRoute");
const searchRoute = require("./searchRoute");

module.exports = {
  adminRoutes,
  authRoutes,
  bookmarkRoutes,
  eventRoutes,
  newsRoutes,
  resourceRoutes,
  userRoutes,
  universitiesRoutes,
  ratingRoutes,
  rsvpRoutes,
  archivedRoutes,
  searchRoute,
};
