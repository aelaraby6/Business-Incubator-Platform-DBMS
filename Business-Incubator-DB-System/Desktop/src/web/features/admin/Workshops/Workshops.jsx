import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Download,
  Calendar,
  Users,
  FileText,
  Zap,
  CheckCircle,
  Loader2,
  Inbox,
  Pin,
  X,
} from "lucide-react";
import AddWorkshopForm from "./AddWorkshopForm";
import WorkshopTable from "./WorkshopTable";
import WorkshopDetails from "./WorkshopDetails";
import { workshopService } from "../../../services/workshopService";

const Workshops = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchWorkshops = async () => {
    setLoading(true);
    try {
      const data = await workshopService.getWorkshops();
      setWorkshops(data);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const handleAddWorkshop = async (formData) => {
    try {
      await workshopService.createWorkshop(formData);
      setShowAddForm(false);
      fetchWorkshops();
    } catch (error) {
      console.error("Error creating workshop:", error);
    }
  };

  const handleDeleteWorkshop = async (id) => {
    if (window.confirm("Are you sure you want to delete this workshop?")) {
      try {
        await workshopService.deleteWorkshop(id);
        fetchWorkshops();
      } catch (error) {
        console.error("Error deleting workshop:", error);
      }
    }
  };

  const handleViewDetails = (workshop) => {
    setSelectedWorkshop(workshop);
    setShowDetailsModal(true);
  };

  const handleExportReport = async (type) => {
    try {
      let filePath;
      if (type === "attendance") {
        filePath = await workshopService.exportAttendanceReport();
        alert(
          "✅ Attendance report downloaded successfully!\n\nSaved to: " +
            filePath,
        );
      } else if (type === "feedback") {
        filePath = await workshopService.exportFeedbackReport();
        alert(
          "✅ Feedback report downloaded successfully!\n\nSaved to: " +
            filePath,
        );
      }
    } catch (error) {
      console.error("Error exporting report:", error);
      alert("❌ Error exporting report. Please try again.");
    }
  };

  const filteredWorkshops = workshops.filter((workshop) => {
    const matchesSearch =
      workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || workshop.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="bg-white border-b-4 border-blue-900 mb-8 -mx-6 md:-mx-10 px-6 md:px-10 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black uppercase text-blue-950 mb-2">
                Workshops Management
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                Manage and track your educational sessions
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-3 font-black text-sm uppercase border-4 border-blue-950 shadow-[3px_3px_0_0_#1e3a8a] hover:shadow-[4px_4px_0_0_#1e3a8a] transition-all flex items-center gap-2 w-fit"
            >
              <Plus size={20} strokeWidth={3} />
              New Workshop
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white border-4 border-gray-900 p-6 shadow-[4px_4px_0_0_#111827]">
            <div className="text-sm font-bold uppercase text-gray-500 mb-2">
              Total Workshops
            </div>
            <div className="text-4xl md:text-5xl font-black text-blue-950">
              {workshops.length}
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-blue-50 border-4 border-blue-900 p-6 shadow-[4px_4px_0_0_#1e3a8a]">
            <div className="text-sm font-bold uppercase text-blue-900 mb-2">
              Active
            </div>
            <div className="text-4xl md:text-5xl font-black text-blue-800">
              {workshops.filter((w) => w.status === "ongoing").length}
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-blue-50 border-4 border-blue-900 p-6 shadow-[4px_4px_0_0_#1e3a8a]">
            <div className="text-sm font-bold uppercase text-blue-900 mb-2">
              Students
            </div>
            <div className="text-4xl md:text-5xl font-black text-blue-800">
              {workshops.reduce((acc, w) => acc + (w.enrolledCount || 0), 0)}
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-100 border-4 border-gray-600 p-6 shadow-[4px_4px_0_0_#4b5563]">
            <div className="text-sm font-bold uppercase text-gray-600 mb-2">
              Completed
            </div>
            <div className="text-4xl md:text-5xl font-black text-gray-700">
              {workshops.filter((w) => w.status === "completed").length}
            </div>
          </div>
        </div>

        {/* Filters & Actions Bar */}
        <div className="bg-white border-4 border-gray-900 p-6 shadow-[4px_4px_0_0_#111827] mb-8">
          <div className="flex flex-col xl:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search workshops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-4 border-gray-900 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-6 py-3 border-4 border-gray-900 font-bold uppercase text-sm bg-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>

              <button
                onClick={() => handleExportReport("attendance")}
                className="px-6 py-3 border-4 border-gray-900 bg-white text-gray-700 font-black uppercase text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-[2px_2px_0_0_#111827]"
              >
                <Download size={16} strokeWidth={3} />
                Attendance
              </button>

              <button
                onClick={() => handleExportReport("feedback")}
                className="px-6 py-3 border-4 border-gray-900 bg-white text-gray-700 font-black uppercase text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-[2px_2px_0_0_#111827]"
              >
                <Download size={16} strokeWidth={3} />
                Feedback
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white border-4 border-gray-900 shadow-[4px_4px_0_0_#111827]">
            <Loader2 className="text-blue-900 animate-spin mb-4" size={48} strokeWidth={3} />
            <p className="text-gray-700 text-xl font-bold uppercase">
              Loading workshops...
            </p>
          </div>
        ) : filteredWorkshops.length > 0 ? (
          <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0_0_#111827] overflow-hidden mb-8">
            <WorkshopTable
              workshops={filteredWorkshops}
              onView={handleViewDetails}
              onDelete={handleDeleteWorkshop}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white border-4 border-gray-900 shadow-[4px_4px_0_0_#111827] text-center mb-8">
            <Inbox size={64} className="text-gray-400 mb-4" strokeWidth={2} />
            <h3 className="text-2xl font-black uppercase text-blue-950 mb-2">
              No workshops found
            </h3>
            <p className="text-gray-600 text-lg max-w-md mb-6 font-medium">
              Get started by creating a new workshop or adjust your filters
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-900 hover:bg-blue-950 text-white px-8 py-3 font-black text-sm uppercase border-4 border-blue-950 shadow-[3px_3px_0_0_#1e3a8a] transition-all"
            >
              Create Workshop
            </button>
          </div>
        )}

        {/* Add Workshop Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-5xl max-h-[90vh] border-4 border-gray-900 shadow-[8px_8px_0_0_#111827] overflow-hidden flex flex-col">
              <div className="p-6 md:p-8 border-b-4 border-gray-900 flex items-center justify-between bg-white">
                <h2 className="text-2xl md:text-3xl font-black uppercase text-blue-950">
                  Add New Workshop
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 w-10 h-10 border-4 border-gray-900 flex items-center justify-center transition-all font-black"
                >
                  <X size={24} strokeWidth={3} />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 bg-gray-50">
                <AddWorkshopForm
                  onSubmit={handleAddWorkshop}
                  onCancel={() => setShowAddForm(false)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedWorkshop && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-3xl max-h-[90vh] border-4 border-gray-900 shadow-[8px_8px_0_0_#111827] overflow-hidden flex flex-col">
              <div className="p-6 md:p-8 border-b-4 border-gray-900 flex items-center justify-between bg-white">
                <h2 className="text-2xl font-black uppercase text-blue-950">
                  Workshop Details
                </h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 w-10 h-10 border-4 border-gray-900 flex items-center justify-center transition-all font-black"
                >
                  <X size={24} strokeWidth={3} />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 bg-gray-50">
                <WorkshopDetails workshop={selectedWorkshop} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workshops;