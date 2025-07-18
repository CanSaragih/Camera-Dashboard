import { useState } from "react";
import logo from "../../assets/logo.svg";
import { https } from "../../helpers/https";
import { useNavigate } from "react-router";
import type { AxiosError } from "axios";
import { motion } from "framer-motion";
import { DotWave } from "@uiball/loaders";
import { toast } from "react-hot-toast";

export default function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <DotWave size={70} speed={1.3} color="#14a570" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-md p-4 sm:p-6 lg:p-8">
      {/* Logo and Heading */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg sm:rounded-xl mb-3 sm:mb-4 shadow-lg">
          <img
            src={logo}
            alt="Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 filter brightness-0 invert"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-800 mb-1">
          Login Page
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Please sign in to your account
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4 sm:space-y-6">
        {error && (
          <motion.div
            key="error-alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md w-full flex items-center justify-between"
          >
            <div className="flex items-center">
              <p className="text-sm font-medium">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        )}
        <div className="space-y-1">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
            Email or Username
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Email or Username"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 lg:py-3.5 border border-gray-300 rounded-lg sm:rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300/40 focus:border-gray-300 transition-all duration-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 lg:py-3.5 border border-gray-300 rounded-lg sm:rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300/40 focus:border-gray-300 transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2.5 sm:py-3 lg:py-3.5 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500/50"
          onClick={handleSubmit}
          disabled={loading}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
