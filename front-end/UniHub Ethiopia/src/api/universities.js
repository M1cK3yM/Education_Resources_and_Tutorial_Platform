import apiClient from "./config";

const getUniversityById = (id) => {
  return apiClient.get("api/universities/" + id);
}

const getAllUniversities = (page) => {
  return apiClient.get("api/universities?page=" + page || 1);
}

export { getUniversityById, getAllUniversities }
