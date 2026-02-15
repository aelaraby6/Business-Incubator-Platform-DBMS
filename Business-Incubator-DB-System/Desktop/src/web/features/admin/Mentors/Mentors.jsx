import React, { useState, useEffect } from "react";
import {
  Plus,
  Briefcase,
  UserCheck,
  Search,
  Loader2,
  Inbox,
  Pin,
  X,
  Filter,
} from "lucide-react";
import MentorTable from "./MentorTable";
import AddMentorForm from "./AddMentorForm";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExpertise, setFilterExpertise] = useState("all");

  const fetchMentors = async () => {
    setLoading(true);
    try {
      const data = await window.electron.invoke("mentors:get-all");
      setMentors(data || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const handleAddMentor = () => {
    setShowAddForm(false);
    fetchMentors();
  };

  const filteredMentors = mentors.filter(
    (m) =>
      (filterExpertise === "all" ||
        (m.expertise &&
          m.expertise.toLowerCase() === filterExpertise.toLowerCase())) &&
      m.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 font-sans h-screen">
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header Section (Neo-Brutalism Style) */}
        <div className="bg-white border-b-4 border-blue-900 mb-8 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase text-blue-950">
              Mentors
            </h1>
            <p className="text-gray-600 mt-2 font-medium">
              Manage experts, assign projects & track activity.
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-950 text-white px-6 py-3 font-bold uppercase border-2 border-black shadow-[4px_4px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-2"
          >
            <Plus size={20} strokeWidth={3} />
            Add Mentor
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Mentors"
            value={mentors.length}
            icon={Briefcase}
          />
          <StatCard
            title="Active"
            value={mentors.filter((m) => m.status === "active").length}
            icon={UserCheck}
          />
          <StatCard
            title="Assigned Projects"
            value={mentors.reduce(
              (acc, m) => acc + parseInt(m.projects_count || 0),
              0,
            )}
            icon={Briefcase}
          />
          <StatCard
            title="Workshops Led"
            value={mentors.reduce(
              (acc, m) => acc + parseInt(m.workshops_count || 0),
              0,
            )}
            icon={Briefcase}
          />
        </div>

        {/* Filters & Actions Bar */}
        <div className="bg-white p-6 border-4 border-gray-900 shadow-[4px_4px_0_0_#111827] mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full sm:w-auto">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
              strokeWidth={2.5}
            />
            <input
              type="text"
              placeholder="SEARCH MENTORS..."
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
              value={filterExpertise}
              onChange={(e) => setFilterExpertise(e.target.value)}
              className="w-full sm:w-56 pl-10 pr-8 py-3 border-2 border-gray-900 bg-gray-50 focus:outline-none focus:ring-0 focus:bg-white font-bold text-gray-800 cursor-pointer appearance-none uppercase"
            >
              <option value="all">All Expertise</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
              <option value="design">Design</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
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

        {/* Table Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white border-4 border-gray-900 border-dashed">
            <Loader2 className="text-4xl text-blue-900 animate-spin mb-4" />
            <p className="text-gray-900 text-xl font-bold uppercase">
              Loading mentors...
            </p>
          </div>
        ) : filteredMentors.length > 0 ? (
          <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0_0_#111827]">
            <MentorTable
              mentors={filteredMentors}
              loading={false}
              onAddClick={() => setShowAddForm(true)}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white border-4 border-gray-900 border-dashed text-center">
            <div className="p-6 bg-gray-100 border-2 border-gray-900 rounded-full mb-6">
              <Inbox className="text-5xl text-gray-900" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-black text-blue-950 uppercase mb-2">
              No mentors found
            </h3>
            <p className="text-gray-600 text-lg font-medium max-w-md mt-1 mb-8">
              Start by adding expert profiles to help guide your startups.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-950 hover:bg-blue-900 text-white px-8 py-3 font-bold uppercase border-2 border-black shadow-[4px_4px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              Add First Mentor
            </button>
          </div>
        )}

        {/* Add Mentor Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-blue-900/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg max-h-[90vh] border-4 border-black shadow-[8px_8px_0_0_black] flex flex-col animate-in fade-in zoom-in duration-200">
              <div className="p-6 border-b-4 border-black flex items-center justify-between bg-blue-50">
                <h2 className="text-2xl font-black text-blue-950 uppercase flex items-center gap-3">
                  <div className="p-2 border-2 border-black bg-white">
                    <Pin size={20} strokeWidth={3} />
                  </div>
                  Add New Mentor
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-black hover:bg-red-100 border-2 border-transparent hover:border-black p-1 transition-all"
                >
                  <X size={28} strokeWidth={3} />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 bg-white">
                <AddMentorForm
                  onClose={() => setShowAddForm(false)}
                  onSuccess={handleAddMentor}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Stat Card Component (Matched to Dashboard Style)
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

export default Mentors;
