import { useState } from "react";
import { ChevronDown, LayoutDashboard, Settings } from "lucide-react";
import logo from "../../assets/logo.svg";

interface SidebarProps {
  isCollapsed: boolean;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        } fixed left-0 top-0 w-72 h-screen bg-white flex flex-col shadow-2xl z-40 transition-transform duration-300 ease-in-out`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-center">
            <div className="relative">
              <img src={logo} alt="Logo" className="w-20 h-20" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-xs font-semibold text-gray-900 leading-tight">
              ASIA COMPUTER VISION
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          {/* Main Section */}
          <div className="mb-6">
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Main
            </h2>

            {/* Dashboard Menu - Active */}
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-white bg-[#019e54] rounded-lg hover:bg-[#068e4f] transition-colors duration-300 cursor-pointer">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
          </div>

          {/* System Section */}
          <div>
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              System
            </h2>

            {/* Setting Menu with Dropdown */}
            <div>
              <button
                onClick={() => setIsSettingOpen(!isSettingOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4" />
                  Setting
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isSettingOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Content */}
              {isSettingOpen && (
                <div className="mt-1 ml-7 space-y-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                    General
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                    Preferences
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
