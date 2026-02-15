import React from "react";
import { Mail, Loader2, Inbox, Edit2, Trash2 } from "lucide-react";

// Now a purely presentational component
const MentorTable = ({ mentors, loading, onEdit, onDelete }) => {
  // Loading State
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white border-4 border-gray-900 border-dashed">
        <Loader2 className="text-blue-900 animate-spin mb-4" size={32} />
        <p className="text-gray-900 font-bold text-lg uppercase">
          Loading mentors...
        </p>
      </div>
    );

  // Empty State
  if (!mentors || mentors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white border-4 border-gray-900 border-dashed text-center">
        <div className="p-5 bg-gray-100 border-2 border-gray-900 rounded-full mb-5">
          <Inbox className="text-gray-900" size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-black text-blue-950 uppercase mb-2">
          No mentors found
        </h2>
        <p className="text-gray-600 text-lg font-medium max-w-sm mb-8">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0_0_#111827] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-blue-100 border-b-4 border-gray-900">
              <th className="p-5 font-black text-blue-950 text-sm uppercase tracking-wider border-r-2 border-gray-900">
                Mentor Name
              </th>
              <th className="p-5 font-black text-blue-950 text-sm uppercase tracking-wider border-r-2 border-gray-900">
                Expertise
              </th>
              <th className="p-5 font-black text-blue-950 text-sm uppercase tracking-wider border-r-2 border-gray-900">
                Assignments
              </th>
              <th className="p-5 font-black text-blue-950 text-sm uppercase tracking-wider text-center border-r-2 border-gray-900">
                Status
              </th>
              <th className="p-5 font-black text-blue-950 text-sm uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-gray-900">
            {mentors.map((m, index) => (
              <tr
                key={m.id || index} // Safe key fallback
                className="hover:bg-blue-50 transition-colors group"
              >
                {/* Name & Email */}
                <td className="p-5 border-r-2 border-gray-900">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 border-2 border-gray-900 bg-white flex items-center justify-center text-blue-900 font-black text-xl shadow-[2px_2px_0_0_black]">
                      {(m.name || "?").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-base uppercase">
                        {m.name || "Unknown Mentor"}
                      </div>
                      <div className="text-gray-500 text-sm font-medium flex items-center gap-1.5 mt-0.5">
                        <Mail size={14} strokeWidth={2.5} />{" "}
                        {m.email || "No Email"}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Expertise Badge */}
                <td className="p-5 border-r-2 border-gray-900">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-black bg-yellow-300 text-gray-900 border-2 border-gray-900 uppercase tracking-wide shadow-[2px_2px_0_0_black]">
                    {m.expertise || "General"}
                  </span>
                </td>

                {/* Assignments Count */}
                <td className="p-5 border-r-2 border-gray-900">
                  <div className="text-sm font-bold text-gray-600 uppercase">
                    <span className="font-black text-blue-900 text-lg">
                      {m.projects_count || 0}
                    </span>{" "}
                    Projects
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="font-black text-blue-900 text-lg">
                      {m.workshops_count || 0}
                    </span>{" "}
                    Workshops
                  </div>
                </td>

                {/* Status */}
                <td className="p-5 text-center border-r-2 border-gray-900">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black border-2 border-gray-900 uppercase shadow-[2px_2px_0_0_black] ${
                      m.status === "active"
                        ? "bg-green-400 text-gray-900"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {m.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Actions (Now functional via props) */}
                <td className="p-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit && onEdit(m)}
                      className="p-2 text-blue-900 hover:bg-blue-100 border-2 border-transparent hover:border-blue-900 rounded transition-all"
                      title="Edit Mentor"
                    >
                      <Edit2 size={18} strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(m.id)}
                      className="p-2 text-red-600 hover:bg-red-100 border-2 border-transparent hover:border-red-600 rounded transition-all"
                      title="Delete Mentor"
                    >
                      <Trash2 size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MentorTable;
