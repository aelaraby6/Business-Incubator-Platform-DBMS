import React from "react";
import {
  Search,
  MapPin,
  Users,
  Box,
  Monitor,
  LayoutGrid,
  Armchair,
  Plus,
  Filter,
  MoreHorizontal,
  Loader2,
} from "lucide-react";

const ResourceTable = ({ resources, loading, onAddClick }) => {
  // Helper to get Icon & Color based on type
  const getTypeBadge = (type) => {
    switch (type) {
      case "meeting_room":
        return {
          icon: Armchair,
          label: "Meeting Room",
          style: "bg-purple-50 text-purple-700 border-purple-100",
        };
      case "equipment":
        return {
          icon: Monitor,
          label: "Equipment",
          style: "bg-orange-50 text-orange-700 border-orange-100",
        };
      case "workspace":
      default:
        return {
          icon: LayoutGrid,
          label: "Workspace",
          style: "bg-blue-50 text-blue-700 border-blue-100",
        };
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200 border-dashed">
        <Loader2 className="text-indigo-600 animate-spin mb-4" size={32} />
        <p className="text-gray-500 font-medium text-lg">
          Loading resources...
        </p>
      </div>
    );

  return (
    <div className="w-full">
      {/* Search & Filter Bar */}
      {resources.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-white text-gray-700 font-medium outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <Filter
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <select className="appearance-none w-full md:w-56 pl-11 pr-10 py-3.5 border border-gray-200 bg-white text-gray-700 font-medium rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer shadow-sm">
              <option value="all">All Types</option>
              <option value="workspace">Workspaces</option>
              <option value="meeting_room">Meeting Rooms</option>
              <option value="equipment">Equipment</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Empty State vs Table */}
      {resources.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-200 border-dashed text-center">
          <div className="p-5 bg-gray-50 rounded-full mb-5">
            <Box className="text-gray-400" size={48} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No resources found
          </h2>
          <p className="text-gray-500 text-lg max-w-sm mb-8">
            Start by adding rooms, desks, or equipment to manage your facility.
          </p>
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <Plus size={20} /> Add First Resource
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200">
                  <th className="p-5 font-semibold text-gray-500 text-sm uppercase tracking-wider">
                    Resource Name
                  </th>
                  <th className="p-5 font-semibold text-gray-500 text-sm uppercase tracking-wider">
                    Type
                  </th>
                  <th className="p-5 font-semibold text-gray-500 text-sm uppercase tracking-wider">
                    Location
                  </th>
                  <th className="p-5 font-semibold text-gray-500 text-sm uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="p-5 font-semibold text-gray-500 text-sm uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-5 font-semibold text-gray-500 text-sm uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {resources.map((res) => {
                  const badge = getTypeBadge(res.type);
                  const BadgeIcon = badge.icon;

                  return (
                    <tr
                      key={res.id}
                      className="hover:bg-gray-50/80 transition-colors group"
                    >
                      {/* Name */}
                      <td className="p-5">
                        <div className="font-bold text-gray-900 text-base">
                          {res.name}
                        </div>
                      </td>

                      {/* Type Badge */}
                      <td className="p-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${badge.style}`}
                        >
                          <BadgeIcon size={14} />
                          {badge.label}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-gray-600 font-medium">
                          <MapPin size={16} className="text-gray-400" />
                          {res.location}
                        </div>
                      </td>

                      {/* Capacity */}
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-gray-600 font-medium">
                          <Users size={16} className="text-gray-400" />
                          {res.capacity} Persons
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                            res.status === "available"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-100 text-gray-600 border-gray-200"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${res.status === "available" ? "bg-green-500" : "bg-gray-400"}`}
                          ></span>
                          {res.status === "available"
                            ? "Available"
                            : "Maintenance"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-5 text-right">
                        <button className="text-gray-400 hover:text-indigo-600 p-2 hover:bg-indigo-50 rounded-lg transition-all">
                          <MoreHorizontal size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceTable;
