import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const OAuthSuccess = () => {
  const { setUser, fetchUser, toast, navigate, setShowUserLogin } = useAppContext();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      fetchUser();
      toast.success("Logged in with Google");
      navigate("/");
    } else {
      toast.error("Google login failed");
      setShowUserLogin(true);
    }
  }, []);

  return null;
};

export default OAuthSuccess;
