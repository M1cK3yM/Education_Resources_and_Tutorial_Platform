import apiClient from "./config";

const getUniversityById = (id) => {
  return apiClient.get(`api/universities/${id}`);
};

const getAllUniversities = (page) => {
  return apiClient.get(`api/universities?page=${page || 1}`);
};

// New function to create an event
const createUniversity = (data, token) => {
  return apiClient.post(`api/universities`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// New function to update an event
const updateUniversity = (id, data, token) => {
  return apiClient.put(`api/universities/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// New function to delete an event
const deleteUniversity = (id) => {
  return apiClient.delete(`api/universities/${id}`);
};

export {
  getUniversityById,
  getAllUniversities,
  createUniversity,
  updateUniversity,
  deleteUniversity,
};
