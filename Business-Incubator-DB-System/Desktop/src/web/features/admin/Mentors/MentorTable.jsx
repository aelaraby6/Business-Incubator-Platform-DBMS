import React from "react";
import { Search, User, Mail, Plus, Loader2, Inbox } from "lucide-react";

const MentorTable = ({ mentors, loading, onAddClick }) => {
  // Loading State
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200 border-dashed">
        <Loader2 className="text-indigo-600 animate-spin mb-4" size={32} />
        <p className="text-gray-500 font-medium text-lg">Loading mentors...</p>
      </div>
    );

  return (
    <div className="w-full">
      {/* Search & Filter Bar */}
      {mentors.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search mentors by name or email..."
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-white text-gray-700 font-medium outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>

          {/* Expertise Filter */}
          <div className="relative">
            <select className="appearance-none w-full md:w-56 px-5 py-3.5 border border-gray-200 bg-white text-gray-700 font-medium rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer shadow-sm">
              <option value="all">All Expertise</option>
              <option value="tech">Technology</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
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
      {mentors.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-200 border-dashed text-center">
          <div className="p-5 bg-gray-50 rounded-full mb-5">
            <Inbox className="text-gray-400" size={48} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No mentors found
          </h2>
          <p className="text-gray-500 text-lg max-w-sm mb-8">
            Get started by adding expert profiles to guide your startups.
          </p>
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <Plus size={20} /> Add First Mentor
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200">
                  <th className="p-5 font-semibold text-gray-500 text-sm uppercase tracking-wider">
                    Mentor Name
                  </th>
                  <th className="p-5 font-semibold text-gray-500 text-sm uppercase tracking-wider">
                    Expertise
                  </th>
                  <th className="p-5 font-semibold text-gray-500 text-sm uppercase tracking-wider">
                    Assignments
                  </th>
                  <th className="p-5 font-semibold text-gray-500 text-sm uppercase tracking-wider text-center">
                    Status
                  </th>
                  <th className="p-5 font-semibold text-gray-500 text-sm uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mentors.map((m) => (
                  <tr
                    key={m.id}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    {/* Name & Email */}
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-base">
                            {m.name}
                          </div>
                          <div className="text-gray-500 text-sm flex items-center gap-1.5 mt-0.5">
                            <Mail size={14} /> {m.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Expertise Badge */}
                    <td className="p-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100 uppercase tracking-wide">
                        {m.expertise || "General"}
                      </span>
                    </td>

                    {/* Assignments Count */}
                    <td className="p-5">
                      <div className="text-sm font-medium text-gray-600">
                        <span className="font-bold text-gray-900">
                          {m.projects_count || 0}
                        </span>{" "}
                        Projects
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="font-bold text-gray-900">
                          {m.workshops_count || 0}
                        </span>{" "}
                        Workshops
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-5 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                          m.status === "active"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${m.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                        ></span>
                        {m.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-5 text-right">
                      <button className="text-gray-400 hover:text-indigo-600 font-medium text-sm transition-colors">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorTable;
