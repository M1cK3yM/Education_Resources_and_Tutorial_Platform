import { useEffect, useState } from "react";
import EventCard from "../components/eventCard";
import { Button } from "@/components/ui/button";

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
      <div className="relative bg-cover bg-center h-64 md:h-96 lg:h-[500px] shadow-2xl rounded-3xl">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-foreground p-4 md:p-8 lg:p-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            Educational and Resource Platform
          </h1>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl">
            Empowering Students and Educators
          </p>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col  items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            😔Oops! You Caught us With no Events
          </h1>
          <p className="text-foreground text-2xl">
            Sorry, we will add new events Soon or Not .
          </p>
          <div className="mt-4 text-center text-lg ">
            <p className="text-gray-600 mb-6"> You might want to explore:</p>
            <a href="/" className=" p-2 hover:underline">
              <Button>Home</Button>
            </a>
            <a href="/resources" className=" p-2 hover:underline ml-2">
              <Button>Resources</Button>
            </a>
            <a href="/contact" className=" p-2 hover:underline ml-2">
              <Button>Contact </Button>
            </a>
          </div>
        </div>
      ) : (
        <ul>
          {events.map((event) => (
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
              detailsUrl={`/events/${event._id}`}
              eventId={event._id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventsPage;
