import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUser,
  faDollarSign,
  faCalendar,
  faFile,
  faSave,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const electron = window.electron || {};
const invoke =
  electron.invoke ||
  (async () => {
    console.error("Electron IPC not available");
    return null;
  });

export default function FundingDetails({ request, onBack }) {
  const [status, setStatus] = useState(request?.status || "Pending");
  const [notes, setNotes] = useState(request?.notes || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleUpdateStatus = async () => {
    if (!request?.id) return;

    setLoading(true);
    try {
      const result = await invoke("funding:updateStatus", {
        id: request.id,
        status,
        notes,
      });

      if (result.success) {
        setMessage({
          type: "success",
          text: "Funding request updated successfully!",
        });
        setTimeout(() => {
          onBack();
        }, 1500);
      } else {
        setMessage({ type: "error", text: "Failed to update funding request" });
      }
    } catch (error) {
      console.error("Error updating funding request:", error);
      setMessage({ type: "error", text: error.message || "Failed to update" });
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower === "approved")
      return "bg-green-100 border-green-500 text-green-900";
    if (statusLower === "pending")
      return "bg-yellow-100 border-yellow-500 text-yellow-900";
    if (statusLower === "rejected")
      return "bg-red-100 border-red-500 text-red-900";
    return "bg-blue-100 border-blue-500 text-blue-900";
  };

  if (!request) {
    return (
      <div className="p-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white border-2 border-black hover:bg-gray-700 font-bold transition-all mb-4"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
        <div className="bg-white border-4 border-gray-900 p-8 text-center">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="mx-auto text-red-400 mb-4 text-5xl"
          />
          <p className="text-gray-600 font-medium">Funding request not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white border-2 border-black hover:bg-gray-700 font-bold transition-all mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 uppercase mb-2">
          Funding Request Review
        </h1>
        <p className="text-gray-600">
          Review and update the status of this funding request
        </p>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-6 border-4 p-4 font-bold ${
            message.type === "success"
              ? "bg-green-100 border-green-500 text-green-900"
              : "bg-red-100 border-red-500 text-red-900"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Project Information */}
          <div className="bg-white border-4 border-gray-900 p-6 mb-6 shadow-[4px_4px_0_0_#000000]">
            <h2 className="text-2xl font-black text-gray-900 uppercase mb-6 border-b-4 border-gray-900 pb-4">
              Project Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-bold text-gray-600 uppercase mb-2">
                  Project Name
                </p>
                <p className="text-lg font-black text-gray-900">
                  {request.project?.name}
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-600 uppercase mb-2">
                  Domain
                </p>
                <p className="text-lg font-black text-gray-900">
                  {request.project?.domain}
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-600 uppercase mb-2">
                  Stage
                </p>
                <span className="inline-block px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold border-2 border-gray-400 uppercase">
                  {request.project?.stage || request.funding_stage}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-600 uppercase mb-2">
                  Status
                </p>
                <span
                  className={`inline-block px-3 py-1 text-sm font-bold border-2 uppercase ${getStatusColor(request.project?.status)}`}
                >
                  {request.project?.status}
                </span>
              </div>
            </div>
          </div>

          {/* Founder Information */}
          <div className="bg-white border-4 border-gray-900 p-6 mb-6 shadow-[4px_4px_0_0_#000000]">
            <h2 className="text-2xl font-black text-gray-900 uppercase mb-6 border-b-4 border-gray-900 pb-4">
              Founder Information
            </h2>

            {request.founders && request.founders.length > 0 ? (
              <div className="space-y-4">
                {request.founders.map((founder, index) => (
                  <div key={index} className="border-2 border-gray-300 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-4">
                        {founder.profile_image ? (
                          <img
                            src={founder.profile_image}
                            alt={founder.name}
                            className="w-16 h-16 rounded-lg border-2 border-gray-400 object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg border-2 border-gray-400 bg-gray-200 flex items-center justify-center">
                            <FontAwesomeIcon
                              icon={faUser}
                              size="lg"
                              className="text-gray-600"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-black text-gray-900">
                            {founder.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {founder.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No founder information available</p>
            )}
          </div>

          {/* Funding Request Details */}
          <div className="bg-white border-4 border-gray-900 p-6 shadow-[4px_4px_0_0_#000000]">
            <h2 className="text-2xl font-black text-gray-900 uppercase mb-6 border-b-4 border-gray-900 pb-4">
              Request Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-bold text-gray-600 uppercase mb-2 flex items-center gap-2">
                  <FontAwesomeIcon icon={faDollarSign} />
                  Amount Requested
                </p>
                <p className="text-3xl font-black text-gray-900">
                  $
                  {parseFloat(request.amount || 0).toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-600 uppercase mb-2 flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendar} />
                  Requested Date
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {request.requested_at
                    ? new Date(request.requested_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )
                    : "N/A"}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-bold text-gray-600 uppercase mb-2 flex items-center gap-2">
                  <FontAwesomeIcon icon={faFile} />
                  Description
                </p>
                <p className="text-gray-800 border-l-4 border-gray-300 pl-4 py-2">
                  {request.description || "No description provided"}
                </p>
              </div>
            </div>

            {/* Review Information */}
            {request.reviewed_at && (
              <div className="bg-gray-100 border-2 border-gray-300 p-4 mb-6">
                <p className="text-sm font-bold text-gray-600 uppercase mb-2">
                  Last Review
                </p>
                <p className="text-gray-800">
                  {new Date(request.reviewed_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  by Admin
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Status Update */}
        <div className="lg:col-span-1">
          {/* Current Status */}
          <div
            className={`border-4 p-6 mb-6 shadow-[4px_4px_0_0_#000000] ${getStatusColor(status)} bg-opacity-10`}
          >
            <div
              className={`inline-block px-3 py-1 text-sm font-bold border-2 uppercase ${getStatusColor(status)}`}
            >
              Current Status
            </div>
            <p
              className={`text-3xl font-black mt-4 ${getStatusColor(status).split(" ")[2]}`}
            >
              {request.status}
            </p>
          </div>

          {/* Update Status Form */}
          <div className="bg-white border-4 border-gray-900 p-6 shadow-[4px_4px_0_0_#000000]">
            <h3 className="text-xl font-black text-gray-900 uppercase mb-4 border-b-4 border-gray-900 pb-3">
              Update Status
            </h3>

            {/* Status Select */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 uppercase mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gray-900 focus:outline-none font-bold"
              >
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 uppercase mb-2">
                Review Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about your decision..."
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gray-900 focus:outline-none font-medium min-h-32 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <button
              onClick={handleUpdateStatus}
              disabled={loading}
              className={`w-full px-4 py-3 font-black uppercase border-2 transition-all flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-400 text-gray-600 border-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white border-black hover:shadow-[4px_4px_0_0_#000] shadow-[2px_2px_0_0_#000]"
              }`}
            >
              <FontAwesomeIcon icon={faSave} />
              {loading ? "Updating..." : "Update Status"}
            </button>

            {/* Color Indicator */}
            <div className="mt-6 pt-6 border-t-2 border-gray-300">
              <p className="text-xs font-bold text-gray-600 uppercase mb-3">
                Status Legend
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-yellow-500 border border-yellow-700"></span>
                  <span className="text-sm font-medium text-gray-700">
                    Pending - Awaiting review
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 border border-blue-700"></span>
                  <span className="text-sm font-medium text-gray-700">
                    Under Review - Being evaluated
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 border border-green-700"></span>
                  <span className="text-sm font-medium text-gray-700">
                    Approved - Funding granted
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 border border-red-700"></span>
                  <span className="text-sm font-medium text-gray-700">
                    Rejected - Not approved
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
