import apiClient from "./config";

const getEventById = (id) => {
  return apiClient.get("api/events/" + id);
}

const getAllEvents = (page) => {
  return apiClient.get("api/events?page=" + page || 1);
}

export { getEventById, getAllEvents }
