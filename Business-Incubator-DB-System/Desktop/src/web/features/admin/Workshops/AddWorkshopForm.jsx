import React, { useState } from "react";
import {
  X,
  Check,
  Type,
  FileText,
  User,
  MapPin,
  Calendar,
  Clock,
  Users,
  Activity,
} from "lucide-react";

const AddWorkshopForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mentor: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    capacity: "",
    location: "",
    status: "scheduled",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.mentor.trim()) newErrors.mentor = "Mentor is required";
    if (!formData.startDate) newErrors.startDate = "Required";
    if (!formData.endDate) newErrors.endDate = "Required";
    if (!formData.startTime) newErrors.startTime = "Required";
    if (!formData.endTime) newErrors.endTime = "Required";
    if (!formData.capacity || formData.capacity <= 0)
      newErrors.capacity = "Invalid capacity";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.startDate) > new Date(formData.endDate)
    ) {
      newErrors.endDate = "End date error";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        title: "",
        description: "",
        mentor: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        capacity: "",
        location: "",
        status: "scheduled",
      });
    }
  };

  // Helper for input classes
  const inputClass = (error) => `
        w-full pl-11 pr-4 py-3 border rounded-xl outline-none transition-all font-medium text-gray-700 bg-white
        ${error ? "border-red-300 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"}
    `;

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col bg-white">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
        {/* Title & Description */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              Workshop Title
            </label>
            <div className="relative">
              <Type
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Advanced React Patterns"
                className={inputClass(errors.title)}
              />
            </div>
            {errors.title && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              Description
            </label>
            <div className="relative">
              <FileText
                className="absolute left-4 top-4 text-gray-400"
                size={18}
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the workshop content..."
                rows="3"
                className={`${inputClass(errors.description)} pt-3 pl-11 resize-none`}
              />
            </div>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.description}
              </p>
            )}
          </div>
        </div>

        {/* Mentor & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              Assigned Mentor
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                name="mentor"
                value={formData.mentor}
                onChange={handleChange}
                placeholder="e.g., John Doe"
                className={inputClass(errors.mentor)}
              />
            </div>
            {errors.mentor && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.mentor}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              Location
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Room A"
                className={inputClass(errors.location)}
              />
            </div>
            {errors.location && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.location}
              </p>
            )}
          </div>
        </div>

        {/* Date & Time Grid */}
        <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
            Schedule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Dates */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Start Date
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={inputClass(errors.startDate)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                End Date
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={inputClass(errors.endDate)}
                />
              </div>
            </div>

            {/* Times */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Start Time
              </label>
              <div className="relative">
                <Clock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={inputClass(errors.startTime)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                End Time
              </label>
              <div className="relative">
                <Clock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={inputClass(errors.endTime)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Capacity & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              Capacity
            </label>
            <div className="relative">
              <Users
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="50"
                min="1"
                className={inputClass(errors.capacity)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              Status
            </label>
            <div className="relative">
              <Activity
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputClass(null)}
              >
                <option value="scheduled">Scheduled</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-gray-100 bg-white flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3.5 px-6 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <X size={20} /> Cancel
        </button>
        <button
          type="submit"
          className="flex-[2] py-3.5 px-6 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
        >
          <Check size={20} /> Create Workshop
        </button>
      </div>
    </form>
  );
};

export default AddWorkshopForm;
