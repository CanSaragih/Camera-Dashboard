import { Navigate, Outlet } from "react-router";
import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/FooterPage";

export function PublicLayout() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
}

export function DashboardLayout() {
  const token = localStorage.getItem("token");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  if (!token) {
    return <Navigate to="/" />;
  }

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
      />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "ml-0" : "ml-72"
        }`}
      >
        <main className="flex-1 p-7 overflow-y-auto bg-white">
          <Outlet />
        </main>
        <Footer alignLeft />
      </div>
    </div>
  );
}
