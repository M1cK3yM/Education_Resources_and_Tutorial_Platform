// import apiClient from "./config"

// const getResourcesById = (id) => {
//   return apiClient.get("api/resources/" + id);
// }

// const getAllResources = (page) => {
//   return apiClient.get("api/resources?page=" + page || 1);
// }
// export { getResourcesById, getAllResources }

import apiClient from "./config";

const getResourcesById = (id) => {
  return apiClient.get(`api/resources/${id}`);
};

const getAllResources = (page) => {
  return apiClient.get(`api/resources?page=${page || 1}`);
};

// New function to create an event
const createResource = (data, token) => {
  return apiClient.post(`/api/resources`, data, {
    headers: {
      "Content-Type": "multipart/form-data", // For image upload support
      Authorization: `Bearer ${token}`,
    },
  });
};

// New function to update an event
const updateResource = (id, data, token) => {
  return apiClient.put(`/api/resources/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data", // For image update support
      Authorization: `Bearer ${token}`,
    },
  });
};

// New function to delete an event
const deleteResource = (id) => {
  return apiClient.delete(`/api/resources/${id}`);
};

export {
  getResourcesById,
  getAllResources,
  createResource,
  updateResource,
  deleteResource,
};
