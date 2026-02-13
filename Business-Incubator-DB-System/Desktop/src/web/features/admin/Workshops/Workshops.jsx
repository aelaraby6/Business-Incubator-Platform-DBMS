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
    <div className="flex-1 mt-4 overflow-y-auto bg-gray-50 font-sans">
      <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 flex items-center gap-4">
              <div className="p-3 md:p-4 bg-indigo-100 rounded-2xl text-indigo-600 shadow-sm">
                <FileText size={24} />
              </div>
              Workshops
            </h1>
            <p className="text-lg md:text-xl text-gray-500 mt-2 ml-1 font-medium">
              Manage and track your educational sessions.
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <Plus size={24} />
            New Workshop
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
                <Calendar size={24} />
              </div>
              <span className="text-sm md:text-base font-bold text-gray-400 uppercase tracking-wider">
                Total
              </span>
            </div>
            <div className="text-4xl md:text-5xl font-black text-gray-900">
              {workshops.length}
            </div>
            <div className="text-base text-gray-500 mt-2 font-medium">
              All workshops
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-green-50 text-green-600 rounded-xl">
                <Zap size={24} />
              </div>
              <span className="text-sm md:text-base font-bold text-gray-400 uppercase tracking-wider">
                Active
              </span>
            </div>
            <div className="text-4xl md:text-5xl font-black text-gray-900">
              {workshops.filter((w) => w.status === "ongoing").length}
            </div>
            <div className="text-base text-gray-500 mt-2 font-medium">
              Ongoing sessions
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-orange-50 text-orange-600 rounded-xl">
                <Users size={24} />
              </div>
              <span className="text-sm md:text-base font-bold text-gray-400 uppercase tracking-wider">
                Students
              </span>
            </div>
            <div className="text-4xl md:text-5xl font-black text-gray-900">
              {workshops.reduce((acc, w) => acc + (w.enrolledCount || 0), 0)}
            </div>
            <div className="text-base text-gray-500 mt-2 font-medium">
              Total enrolled
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl">
                <CheckCircle size={24} />
              </div>
              <span className="text-sm md:text-base font-bold text-gray-400 uppercase tracking-wider">
                Done
              </span>
            </div>
            <div className="text-4xl md:text-5xl font-black text-gray-900">
              {workshops.filter((w) => w.status === "completed").length}
            </div>
            <div className="text-base text-gray-500 mt-2 font-medium">
              Completed workshops
            </div>
          </div>
        </div>

        {/* Filters & Actions Bar */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-8 flex flex-col xl:flex-row gap-5 items-center justify-between">
          <div className="relative flex-1 w-full xl:w-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search workshops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-lg font-medium transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 bg-white cursor-pointer text-lg font-medium"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => handleExportReport("attendance")}
                className="flex-1 sm:flex-none px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 font-bold text-lg flex items-center justify-center gap-3 transition-all"
              >
                <Download className="text-gray-400" />
                <span className="">Attendance</span>
              </button>

              <button
                onClick={() => handleExportReport("feedback")}
                className="flex-1 sm:flex-none px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 font-bold text-lg flex items-center justify-center gap-3 transition-all"
              >
                <Download className="text-gray-400" />
                <span className="">Feedback</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-200 border-dashed">
            <Loader2 className="text-4xl text-indigo-600 animate-spin mb-4" />
            <p className="text-gray-500 text-xl font-medium">
              Loading workshops...
            </p>
          </div>
        ) : filteredWorkshops.length > 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <WorkshopTable
              workshops={filteredWorkshops}
              onView={handleViewDetails}
              onDelete={handleDeleteWorkshop}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-200 border-dashed text-center">
            <div className="p-6 bg-gray-50 rounded-full mb-6">
              <Inbox className="text-5xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No workshops found
            </h3>
            <p className="text-gray-500 text-lg max-w-md mt-1 mb-8">
              Get started by creating a new workshop or try adjusting your
              search filters.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-md"
            >
              Create Workshop
            </button>
          </div>
        )}

        {/* Add Workshop Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity">
            <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
              <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between bg-white">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <Pin size={16} />
                  </div>
                  Add New Workshop
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 bg-gray-50/50">
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
          <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-bold text-gray-900">
                  Workshop Details
                </h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-0">
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
