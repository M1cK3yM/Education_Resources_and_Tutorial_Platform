const cron = require("node-cron");
const Event = require("../models/event.model");
const ArchivedEvent = require("../models/archive.model");
const Session = require("../models/session.model");

const archivePastEvents = cron.schedule("0 0 * * *", async () => {
  try {
    const now = new Date();

    const pastEvents = await Event.find({
      date: { $lt: now },
      status: "active",
    });
    console.log(pastEvents);
    console.log("This is the past Event");
    for (let event of pastEvents) {
      const archivedEvent = new ArchivedEvent({
        title: event.title,
        note: event.note,
        description: event.description,
        location: event.location,
        date: event.date,
        time: event.time,
        image: event.image,
      });
      await archivedEvent.save();
      event.status = "archived";
      await event.save();
    }

    console.log(`Archived ${pastEvents.length} events`);
  } catch (err) {
    console.error("Error archiving Events");
  }
});

const deleteInactiveSessions = () => {
  cron.schedule('0 0 * * *', async () => {
    try {
      const result = await Session.deleteMany(
        {
          active: false,
          updatedAt: { $lte: new Date(Date.now() - 5 * 60 * 1000) }, // 5 min
        }
      );

      console.log(`Deleted ${result.deletedCount} sessions`);
    } catch (err) {
      console.error("Error deleting sessions", err);
    }
  });
}


module.exports = { archivePastEvents, deleteInactiveSessions };
