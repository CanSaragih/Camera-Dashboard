import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { https } from "../helpers/https";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

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
        toast.error("Network error, please try again later.");
      } else {
        switch (axiosError.response.status) {
          case 401:
            toast.error("Session expired. Please login again");
            localStorage.removeItem("token");
            navigate("/");
            break;
          case 403:
            toast.error("You don't have permission to access this.");
            break;
          case 500:
            toast.error("Something went wrong on our end.");
            break;
          default:
            toast.error(
              axiosError.response.data?.error || "An unexpected error occurred."
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
