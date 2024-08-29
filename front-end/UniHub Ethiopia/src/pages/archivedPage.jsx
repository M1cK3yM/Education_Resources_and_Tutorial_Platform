import { useEffect, useState } from "react";
import EventCard from "@/components/eventCard";

function ArchivedPage() {
  const [archivedEvents, setArchivedEvents] = useState([]);

  useEffect(() => {
    fetchArchive();
  }, []);

  const fetchArchive = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/archived-events");
      const data = await response.json();
      setArchivedEvents(data);
    } catch (err) {
      console.error("Failed to fetch: ", err);
    }
  };
  return (
    <div>
      <br />
      <br />
      <br />
      {archivedEvents.map((event) => (
        <EventCard
          key={event._id}
          title={event.title}
          date={
            event.date
              ? `${new Date(event.date).toLocaleDateString()}`
              : "Date not available"
          }
          note={event.note}
          imageUrl={event.image}
          detailsUrl={`/archived-events/${event._id}`}
        />
      ))}
    </div>
  );
}

export default ArchivedPage;
