import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { https } from "../helpers/https";
import type { AxiosError } from "axios";
import { showToastOnce } from "../helpers/toastHelpers";

interface CameraData {
  active_cameras: string[];
  inactive_cameras: string[];
  total_cameras: number;
}

export function useCameraData() {
  const [cameras, setCameras] = useState<CameraData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCameras = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await https.get("/camera", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCameras(data);
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
    fetchCameras();
  }, [fetchCameras]);

  return { cameras, loading };
}
