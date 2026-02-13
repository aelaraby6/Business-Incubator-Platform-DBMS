import React, { useState } from "react";
import {
  X,
  Save,
  Box,
  MapPin,
  Users,
  LayoutGrid,
  Monitor,
  Armchair,
} from "lucide-react";

const AddResourceForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "workspace",
    capacity: 1,
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await window.electron.invoke("resources:add", formData);
      onSuccess();
    } catch (error) {
      console.error("Failed to add resource", error);
    }
  };

  return (
    <div className="bg-white w-full max-w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">

      {/* Form Body */}
      <form
        onSubmit={handleSubmit}
        className="p-6 md:p-8 space-y-6 overflow-y-auto bg-gray-50/50"
      >
        {/* Resource Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
            Resource Name
          </label>
          <div className="relative">
            <Box
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              required
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-medium text-gray-700 bg-white"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Conference Room A"
            />
          </div>
        </div>

        {/* Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
            Resource Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "workspace" })}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${formData.type === "workspace" ? "bg-orange-50 border-orange-200 text-orange-700" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"}`}
            >
              <LayoutGrid size={24} className="mb-2" />
              <span className="text-xs font-bold">Workspace</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "meeting_room" })}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${formData.type === "meeting_room" ? "bg-orange-50 border-orange-200 text-orange-700" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"}`}
            >
              <Armchair size={24} className="mb-2" />
              <span className="text-xs font-bold">Meeting Room</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "equipment" })}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${formData.type === "equipment" ? "bg-orange-50 border-orange-200 text-orange-700" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"}`}
            >
              <Monitor size={24} className="mb-2" />
              <span className="text-xs font-bold">Equipment</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Capacity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              Capacity (Persons)
            </label>
            <div className="relative">
              <Users
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="number"
                min="1"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-medium text-gray-700 bg-white"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
              />
            </div>
          </div>

          {/* Location */}
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
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-medium text-gray-700 bg-white"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="e.g. Floor 2"
              />
            </div>
          </div>
        </div>
      </form>

      {/* Footer / Actions */}
      <div className="p-6 border-t border-gray-100 bg-white">
        <button
          onClick={handleSubmit}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
        >
          <Save size={20} />
          Save Resource
        </button>
      </div>
    </div>
  );
};

export default AddResourceForm;
