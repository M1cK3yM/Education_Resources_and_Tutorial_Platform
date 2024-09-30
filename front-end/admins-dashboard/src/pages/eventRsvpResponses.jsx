import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { eventsApi } from "../api";
import { requestHandler } from "../utils/requestHandler";
import { Loader } from "rsuite";

const EventRsvpResponses = () => {
  const { eventId } = useParams(); // Get eventId from the URL
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRsvps();
  }, [eventId]);

  const fetchRsvps = async () => {
    try {
      const rsvpData = await requestHandler(
        () => eventsApi.getEventRsvps(eventId), // Fetch RSVPs for this event
        setLoading,
        (data) => data.rsvps, // Assume 'rsvps' is the response key for RSVP data
        (error) => setError(error)
      );
      setRsvps(rsvpData.data);
      console.log(rsvpData.data);
    } catch (error) {
      console.error("Error fetching RSVPs:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">RSVP Responses for Event</h1>
      {loading ? (
        <Loader size="md" />
      ) : error ? (
        <p>Error fetching RSVPs: {error.message}</p>
      ) : rsvps.length === 0 ? (
        <p>No RSVPs for this event.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Number of Guests</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map((rsvp, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{rsvp.name}</td>
                <td className="px-4 py-2">{rsvp.email}</td>
                <td className="px-4 py-2">{rsvp.numberOfGuests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventRsvpResponses;
