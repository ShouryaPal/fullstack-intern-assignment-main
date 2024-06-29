import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Token changed:", token);
    const checkSession = async () => {
      if (token) {
        try {
          const response = await fetch("/api/auth/session", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            console.log("Session check successful:", userData);
            dispatch(setUser(userData));
          } else {
            console.log("Session check failed");
            dispatch(clearAuth());
          }
        } catch (error) {
          console.error("Error checking session:", error);
          dispatch(clearAuth());
        }
      } else {
        console.log("No token, clearing auth");
        dispatch(clearAuth());
      }
      setIsLoading(false);
    };

    checkSession();
  }, [dispatch, token]);

  return { user, isLoading };
};

export default useAuthSession;
