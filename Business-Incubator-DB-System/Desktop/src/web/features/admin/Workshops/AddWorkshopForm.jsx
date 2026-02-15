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

  // Shared Styles
  const labelClasses =
    "block text-xs font-black uppercase text-gray-700 mb-1 ml-1 tracking-widest";
  const inputContainerClasses = (hasError) =>
    `flex border-2 ${hasError ? "border-red-600" : "border-black"} bg-white transition-colors focus-within:bg-blue-50`;
  const iconBoxClasses =
    "w-12 bg-gray-100 border-r-2 border-black flex items-center justify-center flex-shrink-0";
  const inputFieldClasses =
    "w-full px-4 py-3 bg-transparent font-bold text-gray-900 placeholder-gray-500 outline-none uppercase disabled:bg-gray-100";

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col bg-white">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
        {/* Section 1: Basic Info */}
        <div className="space-y-6">
          <h3 className="text-lg font-black text-blue-950 uppercase border-b-4 border-blue-950 pb-2 inline-block">
            Workshop Details
          </h3>

          {/* Title */}
          <div>
            <label className={labelClasses}>Workshop Title</label>
            <div className={inputContainerClasses(errors.title)}>
              <div className={iconBoxClasses}>
                <Type size={20} strokeWidth={2.5} />
              </div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="E.G., ADVANCED REACT PATTERNS"
                className={inputFieldClasses}
              />
            </div>
            {errors.title && (
              <p className="text-red-600 text-xs font-bold mt-1 uppercase">
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className={labelClasses}>Description</label>
            <div className={inputContainerClasses(errors.description)}>
              <div className={`${iconBoxClasses} h-auto`}>
                <FileText size={20} strokeWidth={2.5} />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="DESCRIBE THE WORKSHOP CONTENT..."
                rows="3"
                className={`${inputFieldClasses} resize-none`}
              />
            </div>
            {errors.description && (
              <p className="text-red-600 text-xs font-bold mt-1 uppercase">
                {errors.description}
              </p>
            )}
          </div>
        </div>

        {/* Section 2: Logistics */}
        <div className="space-y-6">
          <h3 className="text-lg font-black text-blue-950 uppercase border-b-4 border-blue-950 pb-2 inline-block">
            Logistics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mentor */}
            <div>
              <label className={labelClasses}>Assigned Mentor</label>
              <div className={inputContainerClasses(errors.mentor)}>
                <div className={iconBoxClasses}>
                  <User size={20} strokeWidth={2.5} />
                </div>
                <input
                  type="text"
                  name="mentor"
                  value={formData.mentor}
                  onChange={handleChange}
                  placeholder="E.G., JOHN DOE"
                  className={inputFieldClasses}
                />
              </div>
              {errors.mentor && (
                <p className="text-red-600 text-xs font-bold mt-1 uppercase">
                  {errors.mentor}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className={labelClasses}>Location</label>
              <div className={inputContainerClasses(errors.location)}>
                <div className={iconBoxClasses}>
                  <MapPin size={20} strokeWidth={2.5} />
                </div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="E.G., ROOM A"
                  className={inputFieldClasses}
                />
              </div>
              {errors.location && (
                <p className="text-red-600 text-xs font-bold mt-1 uppercase">
                  {errors.location}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Schedule (Boxed) */}
        <div className="border-4 border-black p-6 bg-blue-50 shadow-[4px_4px_0_0_#1e3a8a]">
          <h3 className="text-sm font-black text-blue-900 uppercase mb-4 flex items-center gap-2">
            <Calendar size={20} strokeWidth={2.5} /> Schedule Configuration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dates */}
            <div>
              <label className={labelClasses}>Start Date</label>
              <div className={inputContainerClasses(errors.startDate)}>
                <div className={iconBoxClasses}>
                  <Calendar size={20} strokeWidth={2.5} />
                </div>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={inputFieldClasses}
                />
              </div>
            </div>
            <div>
              <label className={labelClasses}>End Date</label>
              <div className={inputContainerClasses(errors.endDate)}>
                <div className={iconBoxClasses}>
                  <Calendar size={20} strokeWidth={2.5} />
                </div>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={inputFieldClasses}
                />
              </div>
            </div>

            {/* Times */}
            <div>
              <label className={labelClasses}>Start Time</label>
              <div className={inputContainerClasses(errors.startTime)}>
                <div className={iconBoxClasses}>
                  <Clock size={20} strokeWidth={2.5} />
                </div>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={inputFieldClasses}
                />
              </div>
            </div>
            <div>
              <label className={labelClasses}>End Time</label>
              <div className={inputContainerClasses(errors.endTime)}>
                <div className={iconBoxClasses}>
                  <Clock size={20} strokeWidth={2.5} />
                </div>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={inputFieldClasses}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Capacity</label>
            <div className={inputContainerClasses(errors.capacity)}>
              <div className={iconBoxClasses}>
                <Users size={20} strokeWidth={2.5} />
              </div>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="50"
                min="1"
                className={inputFieldClasses}
              />
            </div>
            {errors.capacity && (
              <p className="text-red-600 text-xs font-bold mt-1 uppercase">
                {errors.capacity}
              </p>
            )}
          </div>

          <div>
            <label className={labelClasses}>Status</label>
            <div className={inputContainerClasses(null)}>
              <div className={iconBoxClasses}>
                <Activity size={20} strokeWidth={2.5} />
              </div>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`${inputFieldClasses} cursor-pointer`}
              >
                <option value="scheduled">SCHEDULED</option>
                <option value="ongoing">ONGOING</option>
                <option value="completed">COMPLETED</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t-4 border-black bg-gray-50 flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-4 px-6 border-2 border-black text-black font-black uppercase hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
        >
          <X size={20} strokeWidth={3} /> Cancel
        </button>
        <button
          type="submit"
          className="flex-[2] py-4 px-6 bg-blue-950 text-white border-2 border-black font-black uppercase shadow-[4px_4px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2"
        >
          <Check size={20} strokeWidth={3} /> Create Workshop
        </button>
      </div>
    </form>
  );
};

export default AddWorkshopForm;
