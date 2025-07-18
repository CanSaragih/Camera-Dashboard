import { useNavigate } from "react-router";

export function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return logout;
}
