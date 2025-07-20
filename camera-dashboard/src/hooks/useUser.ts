import { useCallback, useEffect, useState } from "react";
import { https } from "../helpers/https";
import { useNavigate } from "react-router";
import type { AxiosError } from "axios";
import { showToastOnce } from "../helpers/toastHelpers";

interface User {
  email: string;
  username: string;
  phone?: string;
  role?: "admin" | "viewer";
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await https.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const simulatedRole: "admin" | "viewer" =
        data.username === "admin" ? "admin" : "viewer";

      setUser({ ...data, role: simulatedRole });
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      if (!axiosError.response) {
        showToastOnce(
          "Network error, please try again later.",
          "network-error"
        );
      } else {
        switch (axiosError.response.status) {
          case 401:
            showToastOnce(
              "Session expired, please log in again.",
              "session-expired"
            );
            localStorage.removeItem("token");
            navigate("/");
            break;
          case 403:
            showToastOnce(
              "You don't have permission to access this.",
              "forbidden"
            );
            break;
          case 500:
            showToastOnce("Something went wrong on our end.", "server-error");
            break;
          default:
            showToastOnce(
              axiosError.response.data?.error ||
                "An unexpected error occurred.",
              "unexpected-error"
            );
        }
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading };
}
