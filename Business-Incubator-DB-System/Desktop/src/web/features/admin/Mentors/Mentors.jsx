import React, { useState, useEffect } from "react";
import {
  UserTie,
  Plus,
  ChalkboardTeacher,
  Briefcase,
  UserCheck,
  Search,
  Loader2,
  Inbox,
  Pin,
  X,
} from "lucide-react";
import MentorTable from "./MentorTable";
import AddMentorForm from "./AddMentorForm";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExpertise, setFilterExpertise] = useState("all");

  // Mock fetch for now - replace with window.electron.invoke('mentors:get-all')
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
    <div className="flex-1 overflow-y-auto bg-gray-50 font-sans">
      <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 flex items-center gap-4">
              <div className="p-3 md:p-4 bg-purple-100 rounded-2xl text-purple-600 shadow-sm">
                <UserTie size={24} />
              </div>
              Mentors
            </h1>
            <p className="text-lg md:text-xl text-gray-500 mt-2 ml-1 font-medium">
              Manage experts, assign projects & track activity.
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <Plus size={24} />
            Add Mentor
          </button>
        </div>

        {/* Stats Section (Bigger Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Mentors"
            value={mentors.length}
            icon={UserTie}
            colorClass="bg-blue-50 text-blue-600"
          />
          <StatCard
            title="Active"
            value={mentors.filter((m) => m.status === "active").length}
            icon={UserCheck}
            colorClass="bg-green-50 text-green-600"
          />
          <StatCard
            title="Assigned Projects"
            value={mentors.reduce(
              (acc, m) => acc + parseInt(m.projects_count || 0),
              0,
            )}
            icon={Briefcase}
            colorClass="bg-orange-50 text-orange-600"
          />
          <StatCard
            title="Workshops Led"
            value={mentors.reduce(
              (acc, m) => acc + parseInt(m.workshops_count || 0),
              0,
            )}
            icon={ChalkboardTeacher}
            colorClass="bg-purple-50 text-purple-600"
          />
        </div>

        {/* Filters & Actions Bar */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-8 flex flex-col xl:flex-row gap-5 items-center justify-between">
          <div className="relative flex-1 w-full xl:w-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search mentors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-lg font-medium transition-all"
            />
          </div>

          <div className="w-full xl:w-auto">
            <select
              value={filterExpertise}
              onChange={(e) => setFilterExpertise(e.target.value)}
              className="w-full xl:w-64 px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 bg-white cursor-pointer text-lg font-medium"
            >
              <option value="all">All Expertise</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
              <option value="design">Design</option>
            </select>
          </div>
        </div>

        {/* Table Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-200 border-dashed">
            <Loader2 className="text-4xl text-purple-600 animate-spin mb-4" />
            <p className="text-gray-500 text-xl font-medium">
              Loading mentors...
            </p>
          </div>
        ) : filteredMentors.length > 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <MentorTable
              mentors={filteredMentors}
              loading={false}
              onAddClick={() => setShowAddForm(true)}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-200 border-dashed text-center">
            <div className="p-6 bg-gray-50 rounded-full mb-6">
              <Inbox className="text-5xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No mentors found
            </h3>
            <p className="text-gray-500 text-lg max-w-md mt-1 mb-8">
              Start by adding expert profiles to help guide your startups.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-md"
            >
              Add First Mentor
            </button>
          </div>
        )}

        {/* Add Mentor Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
              <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between bg-white">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <Pin size={16} />
                  </div>
                  Add New Mentor
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 bg-gray-50/50">
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

// Reusable Stat Card Component
const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-6">
      <div className={`p-4 rounded-xl ${colorClass}`}>
        <Icon size={24} />
      </div>
      <span className="text-sm md:text-base font-bold text-gray-400 uppercase tracking-wider">
        {title}
      </span>
    </div>
    <div className="text-4xl md:text-5xl font-black text-gray-900">{value}</div>
  </div>
);

export default Mentors;
