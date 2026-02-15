import React, { useState, useEffect } from "react";
import {
  Box,
  Plus,
  Building,
  Laptop,
  Layers,
  Search,
  Filter,
  Pin,
  X,
} from "lucide-react";
import ResourceTable from "./ResourceTable";
import AddResourceForm from "./AddResourceForm";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const fetchResources = async () => {
    setLoading(true);
    try {
      const data = await window.electron.invoke("resources:get-all");
      setResources(data || []);
    } catch (error) {
      console.error("Failed to fetch resources:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleAddResource = async () => {
    setShowAddForm(false);
    fetchResources();
  };

  const filteredResources = resources.filter(
    (r) =>
      (filterType === "all" || r.type === filterType) &&
      r.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 font-sans h-screen">
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header Section */}
        <div className="bg-white border-b-4 border-blue-900 mb-8 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase text-blue-950 flex items-center gap-3">
              Resources
            </h1>
            <p className="text-gray-600 mt-2 font-medium">
              Manage office spaces, meeting rooms & equipment.
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-950 text-white px-6 py-3 font-bold uppercase border-2 border-black shadow-[4px_4px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-2"
          >
            <Plus size={20} strokeWidth={3} />
            Add Resource
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Resources"
            value={resources.length}
            icon={Layers}
          />
          <StatCard
            title="Workspaces"
            value={resources.filter((r) => r.type === "workspace").length}
            icon={Building}
          />
          <StatCard
            title="Meeting Rooms"
            value={resources.filter((r) => r.type === "meeting_room").length}
            icon={Box}
          />
          <StatCard
            title="Equipment"
            value={resources.filter((r) => r.type === "equipment").length}
            icon={Laptop}
          />
        </div>

        {/* ✅ Search & Filter UI (Moved Here) */}
        <div className="bg-white p-6 border-4 border-gray-900 shadow-[4px_4px_0_0_#111827] mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full sm:w-auto">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
              strokeWidth={2.5}
            />
            <input
              type="text"
              placeholder="SEARCH RESOURCES..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-900 bg-gray-50 focus:outline-none focus:ring-0 focus:bg-white font-bold text-gray-800 placeholder-gray-500 transition-all uppercase"
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <Filter
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
              strokeWidth={2.5}
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full sm:w-56 pl-10 pr-8 py-3 border-2 border-gray-900 bg-gray-50 focus:outline-none focus:ring-0 focus:bg-white font-bold text-gray-800 cursor-pointer appearance-none uppercase"
            >
              <option value="all">All Types</option>
              <option value="workspace">Workspaces</option>
              <option value="meeting_room">Meeting Rooms</option>
              <option value="equipment">Equipment</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-900">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0_0_#111827]">
          <ResourceTable
            resources={filteredResources}
            loading={loading}
            onAddClick={() => setShowAddForm(true)}
          />
        </div>

        {showAddForm && (
          <div
            className="fixed inset-0 bg-blue-900/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            onClick={() => setShowAddForm(false)} 
          >
            <div
              className="bg-white w-full max-w-2xl max-h-[90vh] border-4 border-black shadow-[8px_8px_0_0_black] flex flex-col animate-in fade-in zoom-in duration-200"
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="p-6 border-b-4 border-black flex items-center justify-between bg-blue-50">
                <h2 className="text-2xl font-black text-blue-950 uppercase flex items-center gap-3">
                  <div className="p-2 border-2 border-black bg-white">
                    <Pin size={20} strokeWidth={3} />
                  </div>
                  Add New Resource
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-black hover:bg-red-100 border-2 border-transparent hover:border-black p-1 transition-all"
                >
                  <X size={28} strokeWidth={3} />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 bg-white">
                <AddResourceForm
                  onClose={() => setShowAddForm(false)}
                  onSuccess={handleAddResource}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Stat Card
const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-blue-50 border-4 border-blue-900 p-6 shadow-[4px_4px_0_0_#1e3a8a] hover:-translate-y-1 transition-transform">
    <div className="flex items-start justify-between mb-4">
      <div className="bg-white p-3 border-2 border-blue-950">
        <Icon className="text-blue-900" size={24} strokeWidth={2.5} />
      </div>
    </div>
    <div>
      <p className="text-sm font-bold uppercase text-gray-600 mb-1">{title}</p>
      <h3 className="text-4xl font-black text-blue-950">{value}</h3>
    </div>
  </div>
);

export default Resources;
