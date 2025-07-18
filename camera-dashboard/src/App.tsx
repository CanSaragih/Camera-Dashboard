import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { Toaster } from "react-hot-toast";
import { PublicLayout, DashboardLayout } from "./layouts/RootLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LoginPage />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
