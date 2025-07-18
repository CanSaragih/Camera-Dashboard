import { useState } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  Settings,
  PanelRightOpen,
  PanelRightClose,
} from "lucide-react";
import logo from "../../assets/logo.svg";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  return (
    <>
      {/* Toggle Button - Always visible */}
      <button
        onClick={onToggle}
        className={`fixed ${
          isCollapsed ? "left-4" : "left-64"
        } top-6 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out z-50 border border-gray-200`}
      >
        {isCollapsed ? (
          <PanelRightOpen className="w-5 h-5 text-gray-600" />
        ) : (
          <PanelRightClose className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        } fixed left-0 top-0 w-72 h-screen bg-white flex flex-col shadow-2xl z-40 transition-transform duration-300 ease-in-out`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200 mt-16">
          <div className="flex items-center justify-center">
            <div className="relative">
              <img src={logo} alt="Logo" className="w-20 h-20" />
            </div>
          </div>
          <div className="text-center mt-2">
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
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 transition-colors duration-300">
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
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    General
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    Preferences
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}
