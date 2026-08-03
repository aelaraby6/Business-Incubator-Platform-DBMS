import React, { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  FileText,
  ChevronDown,
  LogOut,
  ArrowRight,
} from "lucide-react";

const Sidebar = ({ activeTab = "Dashboard", setActiveTab = () => {} }) => {
  const [isElementsOpen, setIsElementsOpen] = useState(false);

  const navItems = [
    { id: 1, icon: LayoutDashboard, label: "Dashboard", badge: null },
    { id: 2, icon: BarChart3, label: "Mentors", badge: null },
    { id: 3, icon: Users, label: "Projects", badge: null },
    { id: 4, icon: Package, label: "Workshops", badge: null },
    { id: 5, icon: ShoppingCart, label: "Resources", badge: null },
    { id: 6, icon: FileText, label: "Funding", badge: "New" },
  ];

  const handleItemClick = (label) => {
    setActiveTab(label);
    if (label === "Elements") {
      setIsElementsOpen(!isElementsOpen);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.dispatchEvent(new Event("auth-change"));
  };

  return (
    <div className="w-64 h-screen bg-[#FFFDF5] border-r-4 border-black flex flex-col shrink-0 font-sans overflow-hidden">
      {/* Logo Section */}
      <div className="p-6 border-b-4 border-black bg-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 border-4 border-black flex items-center justify-center bg-white">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-8 h-8"
            >
              <path
                  fill="#00A8FF"
                  d="M352 128c-42.3 0-80 20.3-104 52.3-24-32-61.7-52.3-104-52.3C75.8 128 16 187.8 16 256s59.8 128 128 128c42.3 0 80-20.3 104-52.3 24 32 61.7 52.3 104 52.3 68.2 0 128-59.8 128-128s-59.8-128-128-128zm-208 192c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64zm208 0c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl uppercase leading-none tracking-tighter text-black">
              Incubator
            </span>
            <span className="text-[10px] font-black uppercase text-[#4f46e5] tracking-widest mt-1">
              Admin Suite
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-hide space-y-3">

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.label;

          return (
            <div key={item.id}>
              <button
                onClick={() => handleItemClick(item.label)}
                className={`w-full flex items-center justify-between px-4 py-4 transition-all border-4 font-black uppercase text-xs tracking-widest ${
                  isActive
                    ? "bg-[#4f46e5] text-white border-black shadow-[4px_4px_0_0_#000] translate-x-[-2px] translate-y-[-2px]"
                    : "bg-white text-black border-black hover:bg-[#FFFDF5] hover:shadow-[4px_4px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} strokeWidth={3} />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge === "New" && (
                    <span
                      className={`text-[10px] px-2 py-0.5 border-2 border-black font-black ${isActive ? "bg-white text-black" : "bg-[#f59e0b] text-black"}`}
                    >
                      NEW
                    </span>
                  )}
                  {isActive && (
                    <ArrowRight
                      size={14}
                      strokeWidth={4}
                      className="animate-pulse"
                    />
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </nav>

      {/* Logout Footer */}
      <div className="p-4 border-t-4 border-black bg-white">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-[#ef4444] text-white border-4 border-black font-black uppercase text-xs tracking-widest transition-all shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
        >
          <LogOut size={18} strokeWidth={3} />
          <span>Exit System</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
