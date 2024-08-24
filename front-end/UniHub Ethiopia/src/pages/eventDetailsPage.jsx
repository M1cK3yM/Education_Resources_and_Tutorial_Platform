import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/events/${eventId}`
        );
        setEvent(response.data);
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

  const handleGetTicketsClick = () => {
    console.log("Is user authenticated?", isAuthenticated());
    if (!isAuthenticated()) {
      alert("Please log in to get tickets.");
      navigate("/login");
    } else {
      window.location.href = "https://forms.gle/RLJcBTQn5ojCLk449";
    }
  };

  return (
    <div className="text-foreground font-sans">
      <main className="container mx-auto mt-20 px-4 md:px-0">
        <div className="flex justify-end">
          <img
            src={
              event.image
                ? `http://localhost:3000/uploads/${event.image}`
                : "/src/assets/images/edwin-andrade-6liebVeAfrY-unsplash.jpg"
            }
            alt={event.title}
            className="w-[65vw] h-[500px] object-cover rounded mr-10"
          />
        </div>

        <div className="mt-8 text-left mx-40 mt-20 max-w-3xl">
          <p className="text-yellow-500 text-lg">
            {event.date
              ? `${new Date(event.date).toLocaleDateString()}`
              : "Date not available"}
          </p>
          <h1 className="text-4xl font-bold mt-4">{event.title}</h1>
          <p className="mt-6">{event.description}</p>
          <div className="mt-4 space-y-2">
            <p>
              <span className="font-bold">Time:</span> {event.time}
            </p>
            <p>
              <span className="font-bold">Location:</span> {event.location}
            </p>
          </div>
          <Button onClick={handleGetTicketsClick} className="mt-5">
            Book Event
          </Button>
        </div>
      </main>

      <footer className="mt-12 py-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mr-20">
            <img
              src="/src/assets/images/edwin-andrade-6liebVeAfrY-unsplash.jpg"
              alt="More Events"
              className="w-full h-auto"
            />
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0 text-center md:text-left ml-10">
            <h2 className="text-3xl font-bold">MORE EVENTS AWAIT YOU!</h2>
            <p className="mt-4 w-2/3">
              We can’t wait to connect with you during this year's events. See
              what else we’ve got going on in our 2024 schedule.
            </p>
            <a
              href="#view-schedule"
              className="inline-block mt-8 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-md text-lg font-bold"
            >
              VIEW 2024 SCHEDULE
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EventDetailsPage;
