import { useEffect, useState } from 'react';
import EventCard from "../components/EventCard";

function EventsPage() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div>
      <div
        className="relative bg-cover bg-center h-64 md:h-96 lg:h-[500px]"
        style={{
          backgroundImage:
            "url('/src/assets/images/edwin-andrade-6liebVeAfrY-unsplash.jpg')",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-foreground p-4 md:p-8 lg:p-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            Educational and Resource Platform
          </h1>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl">
            Empowering Students and Educators
          </p>
        </div>
      </div>

      <ul>
        {events.map((event) => (
          <EventCard
            key={event._id}
            title={event.title}
            date={`${event.startDate} - ${event.endDate}`}
            description={event.description}
            imageUrl={event.image ? `http://localhost:3000/uploads/${event.image}` : '/src/assets/images/edwin-andrade-6liebVeAfrY-unsplash.jpg'}
            detailsUrl={`/events/${event._id}`}
          />
        ))}
      </ul>
    </div>
  );
}

export default EventsPage;
