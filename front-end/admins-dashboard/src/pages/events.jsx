import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/eventCardAdmin";
import { eventsApi } from "../api";
import { requestHandler } from "../utils/requestHandler";
import EventForm from "../components/eventForm";

const menuItems = [
  { name: "Home", icon: "🏠" },
  { name: "Universities", icon: "🏛️" },
  { name: "Resources", icon: "📚" },
  { name: "Events", icon: "🎉" },
  { name: "News", icon: "📰" },
  { name: "Users", icon: "👥" },
  { name: "Event RSVP", icon: "📝" },
];

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null); // For updating an event

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!error) {
      fetchEvents(currentPage);
    } else {
      setLoading(false);
    }
  }, [currentPage]);

  const fetchEvents = async (currentPage) => {
    try {
      await requestHandler(
        () => eventsApi.getAllEvents(currentPage),
        setLoading,
        (data) => {
          setEvents(data.events);
          setTotalPages(data.pages);
        },
        (error) => setError(error)
      );
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      try {
        await eventsApi.deleteEvent(eventId);
        fetchEvents(currentPage); // Refresh events after deletion
      } catch (error) {
        console.error("Error deleting event:", error);
        setError(error);
      }
    }
  };

  const handleUpdate = (event) => {
    setCurrentEvent(event);
    setShowForm(true); // Show the form for updating the event
  };

  const handleCreate = () => {
    setCurrentEvent(null); // Clear current event for new creation
    setShowForm(true); // Show the form for creating a new event
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (currentEvent) {
        await eventsApi.updateEvent(currentEvent._id, formData); // Update event
      } else {
        await eventsApi.createEvent(formData); // Create event
      }
      setShowForm(false);
      fetchEvents(currentPage); // Refresh events after creating/updating
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error);
    }
  };
  const navigate = useNavigate();

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
        <h1 className="text-2xl font-bold mb-4">Manage Events</h1>
        <Button onClick={handleCreate} className="mb-4">
          Add Event
        </Button>

        {showForm && (
          <EventForm
            event={currentEvent}
            onSubmit={handleFormSubmit}
            onClose={() => setShowForm(false)}
          />
        )}

        {loading ? (
          <p>Loading...</p>
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
                  <Button onClick={() => handleUpdate(event)}>Update</Button>
                  <Button
                    onClick={() => handleDelete(event._id)}
                    className="bg-red-500 border"
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </EventCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventsPage;