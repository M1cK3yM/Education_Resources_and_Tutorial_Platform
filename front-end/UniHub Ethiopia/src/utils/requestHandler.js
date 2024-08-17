export const requestHandler = async (api, setLoading, onSuccess, onError) => {
  setLoading && setLoading(true);

  try {
    const response = await api();
    if (response.status < 400) {
      onSuccess(response.data);
      console.log(response.data);
    }
  } catch (error) {
    onError(error?.response?.data || "Something went wrong");
  } finally {
    setLoading && setLoading(false);
  }
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
