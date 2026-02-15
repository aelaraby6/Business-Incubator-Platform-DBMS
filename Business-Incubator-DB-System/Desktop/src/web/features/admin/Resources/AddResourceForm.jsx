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
  AlertCircle,
  Loader2,
} from "lucide-react";

const AddResourceForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "workspace",
    capacity: 1,
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...formData,
      capacity: Number(formData.capacity),
    };

    try {
      await window.electron.invoke("resources:add", payload);
      onSuccess();
    } catch (err) {
      console.error("Failed to add resource", err);
      setError("Failed to add resource. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  // Shared Styles
  const inputClasses =
    "w-full pl-4 pr-4 py-3 border-2 border-black bg-white focus:outline-none focus:bg-blue-50 font-bold text-gray-900 placeholder-gray-500 transition-all uppercase disabled:bg-gray-200";
  const labelClasses =
    "block text-xs font-black uppercase text-gray-700 mb-1 ml-1 tracking-widest";
  const iconContainerClasses =
    "flex items-center justify-center border-r-2 border-black bg-gray-100 w-12";

  return (
    <div className="bg-white w-full h-full flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="flex-1 p-6 space-y-8 overflow-y-auto"
      >
        {error && (
          <div className="bg-red-100 border-2 border-red-600 text-red-900 p-4 flex items-center gap-3 font-bold uppercase shadow-[4px_4px_0_0_#dc2626]">
            <AlertCircle size={24} />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-5">
          <h3 className="text-lg font-black text-blue-950 uppercase border-b-4 border-blue-950 pb-2 inline-block">
            Resource Details
          </h3>

          <div>
            <label className={labelClasses}>Resource Name</label>
            <div className="flex border-2 border-black">
              <div className={iconContainerClasses}>
                <Box className="text-black" size={20} strokeWidth={2.5} />
              </div>
              <input
                required
                disabled={loading}
                className={inputClasses}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="E.G. CONFERENCE ROOM A"
              />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClasses}>Resource Type</label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: "workspace", icon: LayoutGrid, label: "Workspace" },
              { id: "meeting_room", icon: Armchair, label: "Room" },
              { id: "equipment", icon: Monitor, label: "Equipment" },
            ].map((type) => (
              <button
                key={type.id}
                type="button"
                disabled={loading}
                onClick={() => setFormData({ ...formData, type: type.id })}
                className={`flex flex-col items-center justify-center p-4 border-2 border-black transition-all ${
                  formData.type === type.id
                    ? "bg-blue-950 text-white shadow-[4px_4px_0_0_black] translate-x-[-2px] translate-y-[-2px]"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
              >
                <type.icon size={28} strokeWidth={2.5} className="mb-2" />
                <span className="text-xs font-black uppercase tracking-wider">
                  {type.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Capacity (Persons)</label>
            <div className="flex border-2 border-black">
              <div className={iconContainerClasses}>
                <Users className="text-black" size={20} strokeWidth={2.5} />
              </div>
              <input
                type="number"
                min="1"
                disabled={loading}
                className={inputClasses}
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className={labelClasses}>Location</label>
            <div className="flex border-2 border-black">
              <div className={iconContainerClasses}>
                <MapPin className="text-black" size={20} strokeWidth={2.5} />
              </div>
              <input
                required
                disabled={loading}
                className={inputClasses}
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="E.G. FLOOR 2"
              />
            </div>
          </div>
        </div>
      </form>

      <div className="p-6 border-t-4 border-black bg-gray-50 flex gap-4">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="flex-1 bg-white hover:bg-gray-100 text-black font-black uppercase text-lg py-4 border-2 border-black transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className={`flex-[2] text-white font-black uppercase text-lg py-4 border-2 border-black shadow-[4px_4px_0_0_black] flex items-center justify-center gap-3 transition-all
                        ${loading ? "bg-gray-400 cursor-not-allowed shadow-none translate-x-[2px] translate-y-[2px]" : "bg-blue-950 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"}`}
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Save size={24} strokeWidth={3} />
          )}
          {loading ? "Saving..." : "Save Resource"}
        </button>
      </div>
    </div>
  );
};

export default AddResourceForm;
