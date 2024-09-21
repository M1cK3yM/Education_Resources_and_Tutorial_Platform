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

// New function to create an event
const createEvent = (data, token) => {
  return apiClient.post(`/api/events`, data, {
    headers: {
      "Content-Type": "multipart/form-data", // For image upload support
      Authorization: `Bearer ${token}`,
    },
  });
};

// New function to update an event
const updateEvent = (id, data,token) => {
  return apiClient.put(`/api/events/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data", // For image update support
      Authorization: `Bearer ${token}`,
    },
  });
};

// New function to delete an event
const deleteEvent = (id) => {
  return apiClient.delete(`/api/events/${id}`);
};

export {
  getEventById,
  getArchivedEventById,
  getAllEvents,
  getArchivedEvents,
  submitRsvpForm,
  createEvent, // Added create event
  updateEvent, // Added update event
  deleteEvent, // Added delete event
};
