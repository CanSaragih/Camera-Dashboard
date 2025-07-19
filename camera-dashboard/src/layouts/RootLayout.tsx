import { Navigate, Outlet } from "react-router";
import { useState } from "react";
import Sidebar from "../components/Layouts/Sidebar";
import Footer from "../components/Layouts/FooterPage";
import Navbar from "../components/Layouts/Navbar";

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
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "ml-0" : "ml-72"
        }`}
      >
        <main className="flex-1 p-6 overflow-y-auto bg-[#fafafa]">
          <div className="flex items-center justify-between mb-5">
            <Navbar onToggleSidebar={handleSidebarToggle} />
          </div>

          <Outlet />
        </main>
        <Footer alignLeft />
      </div>
    </div>
  );
}
