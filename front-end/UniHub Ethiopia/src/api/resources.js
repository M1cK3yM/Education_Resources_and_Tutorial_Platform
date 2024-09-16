import apiClient from "./config"

const getResourcesById = (id) => {
  return apiClient.get("api/resources/" + id);
}

const getAllResources = (page) => {
  return apiClient.get("api/resources?page=" + page || 1);
}
export { getResourcesById, getAllResources }
