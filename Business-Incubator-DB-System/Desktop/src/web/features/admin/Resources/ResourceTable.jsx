import React from "react";
import {
  MapPin,
  Users,
  LayoutGrid,
  Armchair,
  Monitor,
  MoreHorizontal,
  Loader2,
  Inbox,
  Plus,
} from "lucide-react";

const ResourceTable = ({ resources, loading, onAddClick }) => {
  const getTypeBadge = (type) => {
    const baseStyle =
      "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black border-2 border-black uppercase tracking-wide shadow-[2px_2px_0_0_black]";
    switch (type) {
      case "meeting_room":
        return {
          icon: Armchair,
          label: "Meeting Room",
          style: `${baseStyle} bg-purple-300 text-black`,
        };
      case "equipment":
        return {
          icon: Monitor,
          label: "Equipment",
          style: `${baseStyle} bg-orange-300 text-black`,
        };
      case "workspace":
      default:
        return {
          icon: LayoutGrid,
          label: "Workspace",
          style: `${baseStyle} bg-blue-300 text-black`,
        };
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white">
        <Loader2 className="text-blue-900 animate-spin mb-4" size={32} />
        <p className="text-gray-900 font-bold text-lg uppercase">
          Loading resources...
        </p>
      </div>
    );

  if (resources.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white text-center">
        <div className="p-5 bg-gray-100 border-2 border-gray-900 rounded-full mb-5">
          <Inbox className="text-gray-900" size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-black text-blue-950 uppercase mb-2">
          No resources found
        </h2>
        <p className="text-gray-600 text-lg font-medium max-w-sm mb-8">
          Try adjusting your search or add a new resource.
        </p>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-blue-950 text-white px-8 py-3 font-bold uppercase border-2 border-black shadow-[4px_4px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          <Plus size={20} strokeWidth={3} /> Add First Resource
        </button>
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="bg-blue-100 border-b-4 border-gray-900">
            <th className="p-5 font-black text-blue-950 text-sm uppercase border-r-2 border-gray-900">
              Resource Name
            </th>
            <th className="p-5 font-black text-blue-950 text-sm uppercase border-r-2 border-gray-900">
              Type
            </th>
            <th className="p-5 font-black text-blue-950 text-sm uppercase border-r-2 border-gray-900">
              Location
            </th>
            <th className="p-5 font-black text-blue-950 text-sm uppercase border-r-2 border-gray-900">
              Capacity
            </th>
            <th className="p-5 font-black text-blue-950 text-sm uppercase border-r-2 border-gray-900 text-center">
              Status
            </th>
            <th className="p-5 font-black text-blue-950 text-sm uppercase text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-gray-900">
          {resources.map((res) => {
            const badge = getTypeBadge(res.type);
            const BadgeIcon = badge.icon;
            return (
              <tr
                key={res.id}
                className="hover:bg-blue-50 transition-colors group"
              >
                <td className="p-5 border-r-2 border-gray-900 font-bold text-gray-900 text-base uppercase">
                  {res.name}
                </td>
                <td className="p-5 border-r-2 border-gray-900">
                  <span className={badge.style}>
                    <BadgeIcon size={14} strokeWidth={2.5} />
                    {badge.label}
                  </span>
                </td>
                <td className="p-5 border-r-2 border-gray-900 flex items-center gap-2 text-gray-800 font-bold text-sm uppercase">
                  <MapPin
                    size={16}
                    className="text-gray-500"
                    strokeWidth={2.5}
                  />{" "}
                  {res.location}
                </td>
                <td className="p-5 border-r-2 border-gray-900 text-gray-800 font-bold text-sm uppercase">
                  <div className="flex items-center gap-2">
                    <Users
                      size={16}
                      className="text-gray-500"
                      strokeWidth={2.5}
                    />{" "}
                    {res.capacity} Persons
                  </div>
                </td>
                <td className="p-5 text-center border-r-2 border-gray-900">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black border-2 border-black uppercase shadow-[2px_2px_0_0_black] ${res.status === "available" ? "bg-green-400 text-black" : "bg-gray-300 text-gray-600"}`}
                  >
                    <span
                      className={`w-2 h-2 border border-black rounded-full ${res.status === "available" ? "bg-white" : "bg-gray-500"}`}
                    ></span>
                    {res.status === "available" ? "Available" : "Maintenance"}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <button className="text-gray-900 hover:text-blue-700 p-2 hover:bg-blue-100 border-2 border-transparent hover:border-black rounded-lg transition-all">
                    <MoreHorizontal size={20} strokeWidth={2.5} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTable;
