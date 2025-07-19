import type { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { https } from "../helpers/https";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await https.post("/login", {
        username,
        password,
      });

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
      toast.success("Login successful ✅");
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      const errorMessage = axiosError.response?.data?.error || "Login failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, setError };
}
