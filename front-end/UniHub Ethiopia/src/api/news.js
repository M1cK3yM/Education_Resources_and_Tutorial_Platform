import apiClient from "./config";

const getNewsById = (id) => {
  // return apiClient.get("api/news/" + id);
  return apiClient.get(`api/news/${id}`);
};

const getAllNews = (page) => {
  return apiClient.get("api/news?page=" + page || 1);
};

export { getNewsById, getAllNews };
