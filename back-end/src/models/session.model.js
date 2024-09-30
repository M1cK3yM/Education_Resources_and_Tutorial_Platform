const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

sessionSchema.methods.invalidateSession = function () {
  this.active = false;
  return this.save();
}

sessionSchema.statics.invalidateAllSessions = function (userId) {
  return this.updateMany({ userId }, { active: false });
}

sessionSchema.statics.findActiveSessions = function (userId) {
  return this.find({ userId, active: true });
}

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
