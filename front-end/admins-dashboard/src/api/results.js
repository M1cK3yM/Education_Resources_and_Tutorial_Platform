import apiClient from "./config";

const getResults = (query) => {
  return apiClient.get("/search/" + query);
};

export { getResults };
