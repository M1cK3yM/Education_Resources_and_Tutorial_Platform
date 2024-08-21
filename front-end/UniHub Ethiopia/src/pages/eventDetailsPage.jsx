import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import axios from "axios";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/events/${eventId}`
        );
        setEvent(response.data);
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
    <div className="relative container mx-auto p-4 m-20 flex items-center">
      <div className="md:w-1/2 mt-6 md:mt-0 mr-20">
        <img
          src={
            event.image
              ? `http://localhost:3000/uploads/${event.image}`
              : "/src/assets/images/edwin-andrade-6liebVeAfrY-unsplash.jpg"
          }
          alt={event.title}
          className="w-full h-auto mt-4"
        />
      </div>

      <div>
        <p className="text-lg text-gray-700">
          {event.date
            ? `${new Date(event.date).toLocaleDateString()}`
            : "Date not available"}
        </p>
        <h1 className="text-4xl font-bold">{event.title}</h1>
        <p className="mt-4 text-foreground-700">{event.description}</p>
        <Button className="bg-foreground mt-10">Apply</Button>
      </div>
    </div>
  );
};

export default EventDetailsPage;
