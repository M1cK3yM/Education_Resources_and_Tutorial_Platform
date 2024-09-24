export const requestHandler = async (api, setLoading, onSuccess, onError) => {
  setLoading && setLoading(true);

  try {
    const response = await api();
    if (response.status < 400) {
      onSuccess(response.data);
      return { success: true, data: response.data };
    }
  } catch (error) {
    const errorMessage = error?.response?.data || "Something went wrong";
    onError(errorMessage);
    return { success: false, data: errorMessage };
  } finally {
    setLoading && setLoading(false);
  }
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
