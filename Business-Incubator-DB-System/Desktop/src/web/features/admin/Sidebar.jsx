import React, { useState } from 'react';
import {
    LayoutDashboard,
    BarChart3,
    Users,
    Package,
    ShoppingCart,
    FileText,
    Layers,
    FileBarChart,
    MessageSquare,
    Calendar,
    FolderOpen,
    ChevronDown
} from 'lucide-react';

const Sidebar = ({ activeTab = 'Dashboard', setActiveTab = () => {} }) => {
    const [isElementsOpen, setIsElementsOpen] = useState(false);

    const navItems = [
        { id: 1, icon: LayoutDashboard, label: 'Dashboard', badge: null },
        { id: 2, icon: BarChart3, label: 'Mentors', badge: null },
        { id: 3, icon: Users, label: 'Projects', badge: null },
        { id: 4, icon: Package, label: 'Workshops', badge: null },
        { id: 5, icon: ShoppingCart, label: 'Resources', badge: null },
        { id: 6, icon: FileText, label: 'Funding', badge: 'New' },
    ];

    const handleItemClick = (label) => {
        setActiveTab(label);
        if (label === 'Elements') {
            setIsElementsOpen(!isElementsOpen);
        }
    };

    return (
        <div className="w-64 h-screen bg-gray-50 border-r-4 border-gray-900 flex flex-col shrink-0">
            {/* Logo */}
            <div className="p-4 border-b-4 border-gray-900 bg-white">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-900 border-4 border-black flex items-center justify-center shadow-[2px_2px_0_0_#000]">
                        <span className="text-white font-black text-xl">B</span>
                    </div>
                    <span className="font-black text-xl uppercase text-gray-900">Incubator</span>
                </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-3 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.label;

                    return (
                        <div key={item.id}>
                            <button
                                onClick={() => handleItemClick(item.label)}
                                className={`w-full flex items-center justify-between px-4 py-3 mb-2 transition-all border-4 font-bold uppercase text-sm ${
                                    isActive
                                        ? 'bg-gray-900 text-white border-black shadow-[3px_3px_0_0_#000]'
                                        : 'bg-white text-gray-700 border-gray-900 hover:bg-gray-100 shadow-[2px_2px_0_0_#111827]'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={20} strokeWidth={2.5} />
                                    <span className="font-black">{item.label}</span>
                                </div>

                                {/* Badge */}
                                <div className="flex items-center gap-2">
                                    {item.badge === 'New' && (
                                        <span className="bg-gray-900 text-white text-xs px-2 py-1 border-2 border-black font-black uppercase">
                                            New
                                        </span>
                                    )}
                                    {typeof item.badge === 'number' && (
                                        <span className="bg-gray-600 text-white text-xs w-6 h-6 border-2 border-gray-800 flex items-center justify-center font-black">
                                            {item.badge}
                                        </span>
                                    )}
                                    {item.hasDropdown && (
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform ${isElementsOpen && isActive ? 'rotate-180' : ''}`}
                                        />
                                    )}
                                </div>
                            </button>

                            {/* Dropdown for Elements */}
                            {item.hasDropdown && isActive && isElementsOpen && (
                                <div className="ml-4 mb-2 border-l-4 border-gray-900 pl-2">
                                    <div className="text-sm text-gray-700 py-2 px-3 hover:bg-gray-100 font-bold cursor-pointer border-2 border-transparent hover:border-gray-900 mb-1">
                                        Buttons
                                    </div>
                                    <div className="text-sm text-gray-700 py-2 px-3 hover:bg-gray-100 font-bold cursor-pointer border-2 border-transparent hover:border-gray-900 mb-1">
                                        Cards
                                    </div>
                                    <div className="text-sm text-gray-700 py-2 px-3 hover:bg-gray-100 font-bold cursor-pointer border-2 border-transparent hover:border-gray-900">
                                        Tables
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;