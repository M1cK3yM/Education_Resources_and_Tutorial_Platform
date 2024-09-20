import apiClient from "./config";

const getEventById = (id) => {
  return apiClient.get(`api/events/${id}`);
};

const getArchivedEventById = (id) => {
  return apiClient.get(`api/archived-events/${id}`);
};

const getAllEvents = (page) => {
  return apiClient.get(`api/events?page=${page || 1}`);
};

const getArchivedEvents = (page) => {
  return apiClient.get(`api/archived-events?page=${page || 1}`);
};

const submitRsvpForm = (data, token) => {
  return apiClient.post(`/api/events/rsvp`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  getEventById,
  getArchivedEventById,
  getAllEvents,
  getArchivedEvents,
  submitRsvpForm,
};
