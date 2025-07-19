import { useEffect, useState } from "react";
import { https } from "../helpers/https";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useGraphData(endpoint: string) {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await https.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLabels(data.labels);
        setValues(data.values);
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
                axiosError.response.data?.error ||
                  "An unexpected error occurred."
              );
          }
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [endpoint, navigate]);

  return { labels, values, loading };
}
