import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  User,
  Mail,
  Phone,
  Briefcase,
  Activity,
  Layers,
  GraduationCap,
  Loader2,
  AlertCircle,
} from "lucide-react";

const AddMentorForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expertise: "",
    phone: "",
    status: "active",
    assignedProject: "",
    assignedWorkshop: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [projects, setProjects] = useState([]);
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProjects([
          { id: 1, title: "Pharmacy App" },
          { id: 2, title: "E-Commerce" },
        ]);
        setWorkshops([
          { id: 1, title: "React Basics" },
          { id: 2, title: "Agile Scrum" },
        ]);
      } catch (err) {
        console.error("Failed to fetch dropdown data", err);
      }
    };
    fetchData();
  }, []);

  // 4. Optimized Handle Change Helper
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check (Simple example)
    if (!formData.name || !formData.email) {
      setError("Name and Email are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await window.electron.invoke("mentors:add", formData);
      onSuccess();
    } catch (err) {
      console.error("Error adding mentor:", err);
      setError("Failed to add mentor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Shared Styles (Neo-Brutalism)
  const inputClasses =
    "w-full pl-12 pr-4 py-3 border-2 border-black bg-white focus:outline-none focus:bg-blue-50 font-bold text-gray-900 placeholder-gray-500 transition-all disabled:bg-gray-100 disabled:text-gray-400";
  const labelClasses =
    "block text-xs font-black uppercase text-gray-700 mb-1 ml-1 tracking-widest";
  const iconContainerClasses =
    "absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r-2 border-black bg-gray-100";

  return (
    <div className="bg-white w-full h-full flex flex-col">
      {/* Form Body */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 p-6 space-y-8 overflow-y-auto"
      >
        {/* Error Banner */}
        {error && (
          <div className="bg-red-100 border-2 border-red-600 text-red-900 p-4 flex items-center gap-3 font-bold uppercase shadow-[4px_4px_0_0_#dc2626]">
            <AlertCircle size={24} />
            <span>{error}</span>
          </div>
        )}

        {/* Basic Info Section */}
        <div className="space-y-5">
          <h3 className="text-lg font-black text-blue-950 uppercase border-b-4 border-blue-950 pb-2 inline-block">
            Personal Information
          </h3>

          {/* Name */}
          <div>
            <label className={labelClasses}>Full Name</label>
            <div className="relative group">
              <div className={iconContainerClasses}>
                <User className="text-black" size={20} strokeWidth={2.5} />
              </div>
              <input
                required
                className={inputClasses}
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="DR. AHMED ALI"
                disabled={loading}
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Email Address</label>
              <div className="relative group">
                <div className={iconContainerClasses}>
                  <Mail className="text-black" size={20} strokeWidth={2.5} />
                </div>
                <input
                  required
                  type="email"
                  className={inputClasses}
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="EXAMPLE@EMAIL.COM"
                  disabled={loading}
                />
              </div>
            </div>
            <div>
              <label className={labelClasses}>Phone Number</label>
              <div className="relative group">
                <div className={iconContainerClasses}>
                  <Phone className="text-black" size={20} strokeWidth={2.5} />
                </div>
                <input
                  className={inputClasses}
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+20 1XXXXXXXXX"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Professional Info Section */}
        <div className="space-y-5 pt-2">
          <h3 className="text-lg font-black text-blue-950 uppercase border-b-4 border-blue-950 pb-2 inline-block">
            Professional Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Expertise Area</label>
              <div className="relative group">
                <div className={iconContainerClasses}>
                  <Briefcase
                    className="text-black"
                    size={20}
                    strokeWidth={2.5}
                  />
                </div>
                <select
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  value={formData.expertise}
                  onChange={(e) => handleChange("expertise", e.target.value)}
                  disabled={loading}
                >
                  <option value="">SELECT FIELD...</option>
                  <option value="Technology">TECHNOLOGY</option>
                  <option value="Business">BUSINESS</option>
                  <option value="Marketing">MARKETING</option>
                  <option value="Design">DESIGN</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
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
            <div>
              <label className={labelClasses}>Account Status</label>
              <div className="relative group">
                <div className={iconContainerClasses}>
                  <Activity
                    className="text-black"
                    size={20}
                    strokeWidth={2.5}
                  />
                </div>
                <select
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  disabled={loading}
                >
                  <option value="active">ACTIVE</option>
                  <option value="inactive">INACTIVE</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
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
          </div>
        </div>

        {/* Assignment Section (Dynamic) */}
        <div className="pt-6 border-t-4 border-dashed border-gray-300">
          <div className="bg-blue-50 p-6 border-4 border-blue-900 shadow-[4px_4px_0_0_#1e3a8a]">
            <h3 className="text-sm font-black text-blue-900 uppercase mb-4 flex items-center gap-2">
              <Layers size={20} strokeWidth={2.5} /> Quick Assignment{" "}
              <span className="text-blue-400 text-xs font-bold">
                (OPTIONAL)
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dynamic Projects */}
              <div className="relative group">
                <div
                  className={iconContainerClasses + " border-blue-900 bg-white"}
                >
                  <Briefcase
                    className="text-blue-900"
                    size={20}
                    strokeWidth={2.5}
                  />
                </div>
                <select
                  className={`${inputClasses} border-blue-900 focus:bg-white`}
                  value={formData.assignedProject}
                  onChange={(e) =>
                    handleChange("assignedProject", e.target.value)
                  }
                  disabled={loading}
                >
                  <option value="">ASSIGN TO PROJECT...</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title.toUpperCase()}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-blue-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Dynamic Workshops */}
              <div className="relative group">
                <div
                  className={iconContainerClasses + " border-blue-900 bg-white"}
                >
                  <GraduationCap
                    className="text-blue-900"
                    size={20}
                    strokeWidth={2.5}
                  />
                </div>
                <select
                  className={`${inputClasses} border-blue-900 focus:bg-white`}
                  value={formData.assignedWorkshop}
                  onChange={(e) =>
                    handleChange("assignedWorkshop", e.target.value)
                  }
                  disabled={loading}
                >
                  <option value="">ASSIGN TO WORKSHOP...</option>
                  {workshops.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.title.toUpperCase()}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-blue-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
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
          </div>
        </div>

        <div className="p-6 border-t-4 border-black bg-gray-50 mt-auto sticky bottom-0">
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-black uppercase text-lg py-4 border-2 border-black shadow-[4px_4px_0_0_black] transition-all flex items-center justify-center gap-3
                            ${
                              loading
                                ? "bg-gray-400 cursor-not-allowed shadow-none translate-x-[2px] translate-y-[2px]"
                                : "bg-blue-950 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                            }`}
          >
            {loading ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                CREATING...
              </>
            ) : (
              <>
                <Save size={24} strokeWidth={3} />
                CREATE MENTOR PROFILE
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMentorForm;
