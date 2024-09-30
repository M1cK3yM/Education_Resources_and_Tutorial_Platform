// import apiClient from "./config";

// const getNewsById = (id) => {
//   // return apiClient.get("api/news/" + id);
//   return apiClient.get(`api/news/${id}`);
// };

// const getAllNews = (page) => {
//   return apiClient.get("api/news?page=" + page || 1);
// };

// export { getNewsById, getAllNews };

import apiClient from "./config";

const getNewsById = (id) => {
  return apiClient.get(`api/news/${id}`);
};

const getAllNews = (page) => {
  return apiClient.get(`api/news?page=${page || 1}`);
};

// New function to create an event
const createNews = (data) => {
  return apiClient.post(`/api/news`, data, {
    headers: {
      "Content-Type": "multipart/form-data", // For image upload support
      // Authorization: `Bearer ${token}`,
    },
  });
};

// New function to update an event
const updateNews = (id, data, token) => {
  return apiClient.put(`/api/news/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data", // For image update support
      Authorization: `Bearer ${token}`,
    },
  });
};

// New function to delete an event
const deleteNews = (id) => {
  return apiClient.delete(`/api/news/${id}`);
};

export {
  getNewsById,
  getAllNews,
  createNews, // Added create event
  updateNews, // Added update event
  deleteNews, // Added delete event
};
