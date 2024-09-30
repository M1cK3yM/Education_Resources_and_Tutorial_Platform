import apiClient from "./config";

const getNewsById = (id) => {
  return apiClient.get(`api/news/${id}`);
};

const getAllNews = (page) => {
  return apiClient.get(`api/news?page=${page || 1}`);
};


const createNews = (data) => {
  return apiClient.post(`/api/news`, data, {
    headers: {
      "Content-Type": "multipart/form-data", 
      // Authorization: `Bearer ${token}`,
    },
  });
};

// New function to update an event
const updateNews = (id, data, token) => {
  return apiClient.put(`/api/news/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data", 
      Authorization: `Bearer ${token}`,
    },
  });
};


const deleteNews = (id) => {
  return apiClient.delete(`/api/news/${id}`);
};

export {
  getNewsById,
  getAllNews,
  createNews, 
  updateNews, 
  deleteNews, 
};
