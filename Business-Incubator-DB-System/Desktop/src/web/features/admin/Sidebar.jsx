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

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('Dashboard');
    const [isElementsOpen, setIsElementsOpen] = useState(false);

    const navItems = [
        { id: 1, icon: LayoutDashboard, label: 'Dashboard', badge: null },
        { id: 2, icon: BarChart3, label: 'Mentors', badge: null },
        { id: 3, icon: Users, label: 'Projects', badge: null },
        { id: 4, icon: Package, label: 'Workshops', badge: null },
        { id: 5, icon: ShoppingCart, label: 'Resources', badge: null },
        { id: 6, icon: FileText, label: 'Funding', badge: 'New' },
        { id: 6, icon: FileText, label: 'Notifications', badge: 'New' },
        // { id: 7, icon: Layers, label: 'Notifications', badge: 'New', hasDropdown: true }
    ];

    const handleItemClick = (label) => {
        setActiveItem(label);
        if (label === 'Elements') {
            setIsElementsOpen(!isElementsOpen);
        }
    };

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
            {/* Logo */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">B</span>
                    </div>
                    <span className="font-semibold text-xl">Incubator</span>
                </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-3 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.label;

                    return (
                        <div key={item.id}>
                            <button
                                onClick={() => handleItemClick(item.label)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg mb-1 transition-colors ${isActive
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </div>

                                {/* Badge */}
                                <div className="flex items-center gap-2">
                                    {item.badge === 'New' && (
                                        <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                                            New
                                        </span>
                                    )}
                                    {typeof item.badge === 'number' && (
                                        <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
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
                                <div className="ml-6 mt-1 mb-2">
                                    <div className="text-sm text-gray-600 py-1.5 px-3 hover:bg-gray-50 rounded cursor-pointer">
                                        Buttons
                                    </div>
                                    <div className="text-sm text-gray-600 py-1.5 px-3 hover:bg-gray-50 rounded cursor-pointer">
                                        Cards
                                    </div>
                                    <div className="text-sm text-gray-600 py-1.5 px-3 hover:bg-gray-50 rounded cursor-pointer">
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