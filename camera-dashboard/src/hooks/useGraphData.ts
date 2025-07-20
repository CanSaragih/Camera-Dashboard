import { useEffect, useState } from "react";
import { https } from "../helpers/https";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { showToastOnce } from "../helpers/toastHelpers";

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
    }
    fetchData();
  }, [endpoint, navigate]);

  return { labels, values, loading };
}
