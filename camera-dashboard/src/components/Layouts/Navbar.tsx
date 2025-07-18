import { AnimatePresence } from "framer-motion";
import { Menu, Bell, CircleUser, User, Settings, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLogout } from "../../hooks/useLogout";
import { useUser } from "../../hooks/useUser";

export default function Navbar({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const logout = useLogout();
  const { user, loading } = useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-[#019e54] px-4 py-2.5 flex items-center justify-between rounded-xl shadow-sm relative">
      {/* Left: Sidebar Toggle */}
      <div className="flex items-center">
        <button
          className="p-2 rounded-lg hover:bg-green-700/40 transition-colors duration-300 text-zinc-100 hover:text-zinc-200"
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <Menu size={25} />
        </button>
      </div>

      {/* Right: Bell + Profile */}
      <div className="flex items-center gap-3 relative" ref={dropdownRef}>
        <button
          className="p-2 rounded-lg hover:bg-green-700/40 transition-colors duration-300 text-zinc-100 hover:text-zinc-200"
          aria-label="Notifications"
        >
          <Bell size={25} />
        </button>

        {/* Profile Dropdown Toggle */}
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="p-2 flex items-center justify-center text-zinc-100 cursor-pointer group"
        >
          <CircleUser
            size={29}
            className="transition-transform duration-300 group-hover:scale-105 group-hover:text-zinc-200"
          />
        </div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-16 right-0 bg-white shadow-2xl rounded-lg w-56 py-3 z-50 border border-gray-100"
            >
              {/* User Info Section */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <CircleUser size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 ">
                      {loading ? "Loading..." : user?.username || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {loading ? "Loading..." : user?.email || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 flex items-center gap-3">
                  <User className="w-4 h-4 text-zinc-400" />
                  My Profile
                </button>
                <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 flex items-center gap-3">
                  <Settings className="w-4 h-4 text-zinc-400" />
                  Settings
                </button>
                <div className="border-t border-gray-100 my-2"></div>
                <button
                  onClick={logout}
                  className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 flex items-center gap-3"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
