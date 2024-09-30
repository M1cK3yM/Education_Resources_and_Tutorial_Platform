import { useEffect, useState } from "react";
import { eventsApi } from "../api";
import { requestHandler } from "../utils/requestHandler";
import { Loader } from "rsuite";
import EventCard from "../components/eventCardAdmin";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Home", icon: "🏠" },
  { name: "Universities", icon: "🏛️" },
  { name: "Resources", icon: "📚" },
  { name: "Events", icon: "🎉" },
  { name: "News", icon: "📰" },
  { name: "Users", icon: "👥" },
  { name: "Event RSVP", icon: "📝" },
];

const EventRsvp = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventData = await requestHandler(
        () => eventsApi.getAllEvents(), // Fetch all events
        setLoading,
        (data) => data.events,
        (error) => setError(error)
      );
      const response = eventData.data.events;

      // Fetch RSVPs for each event in parallel
      const rsvpPromises = response.map((event) =>
        eventsApi.getEventRsvps(event._id).then((rsvps) => ({
          ...event,
          rsvpCount: rsvps.data.length, // Add the count of RSVPs
        }))
      );

      const eventsWithRsvps = await Promise.all(rsvpPromises);
      setEvents(eventsWithRsvps);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleShowResponses = (eventId) => {
    // Navigate to the RSVP page for the selected event
    navigate(`/admin/event-rsvp/${eventId}/responses`);
  };

  const handleItemClick = (item) => {
    navigate(`/admin/${item.toLowerCase().replace(" ", "-")}`);
  };

  return (
    <div className="flex bg-gray-100">
      <div className="w-64 bg-gray-800 text-white p-4 min-h-screen">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        <nav>
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="w-full justify-start mb-2 text-white hover:bg-gray-700"
              onClick={() => handleItemClick(item.name)}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </Button>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Event RSVPs</h1>
        {loading ? (
          <Loader size="md" />
        ) : error ? (
          <p>Error fetching events: {error.message}</p>
        ) : events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <EventCard
                key={event._id}
                title={event.title}
                date={event.date}
                note={event.note}
                imageUrl={event.image}
              >
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleShowResponses(event._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Show Responses
                  </button>
                  <div>Total Responses: {event.rsvpCount}</div> {/* Display RSVP count */}
                </div>
              </EventCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventRsvp;
