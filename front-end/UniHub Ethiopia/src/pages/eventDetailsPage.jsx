import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`/api/events/${eventId}`);
        setEvent(response.data);
        console.log(response);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">{event.title}</h1>
      <p className="text-lg text-gray-700">
        {/* {new Date(event.date).toLocaleDateString()} */}
        {event.date}
      </p>
      <img src={event.image} alt={event.title} className="w-full h-auto mt-4" />
      <p className="mt-4 text-gray-700">{event.description}</p>
    </div>
  );
};

export default EventDetailsPage;
