import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useAuthDialog } from "@/context/AuthDialogContext";
import {
  FaTelegramPlane,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const EventDetailsPage = ({ isArchived = false }) => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const { isAuthenticated } = useAuth();
  const { toggleLogin } = useAuthDialog();
  const currentUrl = window.location.href;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const endPoint = isArchived
          ? `http://localhost:3000/api/archived-events/${eventId}`
          : `http://localhost:3000/api/events/${eventId}`;
        console.log(endPoint);
        const response = await axios.get(endPoint);
        setEvent(response.data);
      } catch (err) {
        console.error("Error fetching event details:", err);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId, isArchived]);

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const handleGetTicketsClick = () => {
    console.log("Is user authenticated?", isAuthenticated());

    if (!isAuthenticated()) {
      toggleLogin();
    } else {
      navigate(`/event/rsvp/${eventId}`, {
        state: {
          title: event.title,
          image: event.image,
        },
      });
    }
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    alert("Link copied to clipboard. Share it on Instagram!");
  };

  return (
    <div className="text-foreground font-sans">
      <main className="container mx-auto mt-20 px-4 md:px-0">
        <div className="flex justify-end">
          <img
            src={event.image}
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
        </div>
        <div className="flex flex-row">
          <div className="mt-8 text-left mx-40 mt-20 max-w-3xl">
            <div className="mt-4 space-y-2">
              <p>
                <span className=" text-lg">Time:</span> {event.time}
              </p>
              <p className="text-base">
                <span className="text-lg">Location:</span> {event.location}
              </p>
              {!isArchived && (
                <div>
                  <p className=" text-lg">
                    Created on: {new Date(event.createdAt).toLocaleDateString()}
                  </p>
                  <p className=" text-lg">
                    Last updated:{" "}
                    {new Date(event.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
            {!isArchived && (
              <Button onClick={handleGetTicketsClick} className="mt-5">
                Book Event
              </Button>
            )}
          </div>
          <div className="w-1/2">
            <p className="mt-6 w-auto text-base">{event.description}</p>
            <p className="mt-8 text-base">
              Help us spread the word by sharing this page!
            </p>
            <div className="my-2 flex space-x-4 overflow-visible">
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(
                  currentUrl
                )}&text=${encodeURIComponent(event.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                <FaTelegramPlane size={30} />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  currentUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700"
              >
                <FaFacebook size={30} />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  currentUrl
                )}&title=${encodeURIComponent(event.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:text-blue-900"
              >
                <FaLinkedin size={30} />
              </a>
              <button onClick={handleCopyLink} className="text-pink-600 ">
                <FaInstagram size={30} />
              </button>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  currentUrl
                )}&text=${encodeURIComponent(event.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                <FaTwitter size={30} />
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `${event.title} ${currentUrl}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600"
              >
                <FaWhatsapp size={30} />
              </a>
            </div>
            <hr />
          </div>
        </div>
      </main>

      <section className="mt-12 py-12">
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
              We can’t wait to connect with you during this year’s events. See
              what else we’ve got going on in our 2024 schedule.
            </p>
            <Link
              to="/events" // Use Link and 'to' for navigation
            >
              <Button className="mt-5">VIEW 2024 SCHEDULE</Button>
            </Link>
          </div>
          <div className="md:w-1/3 mt-8 md:mt-0 text-center md:text-left ml-10">
            <h2 className="text-2xl font-bold">PREVIOUSE EVENTS</h2>
            <p className="mt-4 w-2/3">
              We can’t wait to show you how the attendant of the past events
              enjoy during this year’s events.
            </p>
            <Link
              to="/archived-events" // Use Link and 'to' for navigation
            >
              <Button className="mt-5">VIEW PAST SCHEDULE</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetailsPage;
