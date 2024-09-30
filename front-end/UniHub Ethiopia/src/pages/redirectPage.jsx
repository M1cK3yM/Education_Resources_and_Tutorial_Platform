import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "@/api";
import { requestHandler } from "@/utils/requestHandler";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "rsuite";
import { useState } from "react";

const RedirectPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code")
  const [error, setError] = useState();

  useEffect(() => {
    const handleRedirect = async () => {
      if (code) {
        try {
          await requestHandler(
            async () => await authApi.redirect(code),
            null,
            (res) => {
              console.log("Success:", res);
              setUser(res.data);
              document.cookie = `accessToken=${res.accessToken}; path=/; max-age=900`;
              document.cookie = `refreshToken=${res.refreshToken}; path=/; max-age=${15 * 24 * 60 * 60}`;// max-age 15day
              navigate("/");
            },
            (error) => {
              console.error("Error:", error);
              setError(error);
            }
          );
        } catch (error) {
          console.error("Unexpected error:", error);
        }
      }
    };

    handleRedirect();
  }, [code]);

  return (
    <div className="flex flex-col  items-center justify-center h-screen">
      {error && <p className="text-red-500">{error}</p>}
      <Loader size="md" center />
    </div>
  )
}

export default RedirectPage;
