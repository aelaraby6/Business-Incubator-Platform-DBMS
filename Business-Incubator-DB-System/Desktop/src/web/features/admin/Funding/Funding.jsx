import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faSearch,
  faDollarSign,
  faSpinner,
  faCheckCircle,
  faClock,
  faXmarkCircle,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import FundingDetails from "./FundingDetails";

const electron = window.electron || {};
const invoke =
  electron.invoke ||
  (async () => {
    console.error("Electron IPC not available");
    return [];
  });

export default function Funding() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterStage, setFilterStage] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [fundingRequests, setFundingRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    totalAmount: 0,
  });

  // Fetch all funding requests
  const fetchFundingRequests = async () => {
    setLoading(true);
    try {
      const queryParams = [];
      if (filterStatus !== "all") queryParams.push(`status=${filterStatus}`);
      if (filterStage !== "all")
        queryParams.push(`funding_stage=${filterStage}`);

      const query = queryParams.length > 0 ? "?" + queryParams.join("&") : "";
      const data = await invoke("funding:getAll", query);
      setFundingRequests(data?.data || []);

      // Calculate stats
      calculateStats(data?.data || []);
    } catch (error) {
      console.error("Error fetching funding requests:", error);
    }
    setLoading(false);
  };

  // Calculate statistics
  const calculateStats = (requests) => {
    const stats = {
      total: requests.length,
      pending: 0,
      approved: 0,
      rejected: 0,
      totalAmount: 0,
    };

    requests.forEach((req) => {
      stats.totalAmount += parseFloat(req.amount || 0);
      if (req.status.toLowerCase() === "pending") stats.pending++;
      else if (req.status.toLowerCase() === "approved") stats.approved++;
      else if (req.status.toLowerCase() === "rejected") stats.rejected++;
    });

    setStats(stats);
  };

  // Fetch dashboard data
  const fetchDashboard = async () => {
    try {
      await invoke("funding:getDashboard");
      // Use this for dashboard stats
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFundingRequests();
    fetchDashboard();
  }, [filterStatus, filterStage]);

  // Filter and search funding requests
  const filteredRequests = fundingRequests.filter((request) => {
    const matchesSearch =
      request.project?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.founders?.some((f) =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesStatus =
      filterStatus === "all" ||
      request.status?.toLowerCase() === filterStatus.toLowerCase();

    const matchesStage =
      filterStage === "all" ||
      (request.project?.stage || request.funding_stage)?.toLowerCase() ===
        filterStage.toLowerCase();

    return matchesSearch && matchesStatus && matchesStage;
  });

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower === "approved")
      return "bg-green-100 text-green-800 border-green-300";
    if (statusLower === "pending")
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    if (statusLower === "rejected")
      return "bg-red-100 text-red-800 border-red-300";
    return "bg-gray-100 text-gray-800 border-gray-300";
  };

  const getStatusIcon = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower === "approved")
      return <FontAwesomeIcon icon={faCheckCircle} size="sm" />;
    if (statusLower === "pending")
      return <FontAwesomeIcon icon={faClock} size="sm" />;
    if (statusLower === "rejected")
      return <FontAwesomeIcon icon={faXmarkCircle} size="sm" />;
    return null;
  };

  return (
    <>
      {showDetails ? (
        <FundingDetails
          request={selectedRequest}
          onBack={() => {
            setShowDetails(false);
            setSelectedRequest(null);
            fetchFundingRequests();
          }}
        />
      ) : (
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900 uppercase mb-2">
              Funding Requests
            </h1>
            <p className="text-gray-600">
              Review and manage funding requests from projects
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white border-4 border-gray-900 p-4 shadow-[4px_4px_0_0_#000000]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-600 uppercase mb-1">
                    Total Requests
                  </p>
                  <p className="text-3xl font-black text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <FontAwesomeIcon
                  icon={faDollarSign}
                  size="lg"
                  className="text-gray-400"
                />
              </div>
            </div>

            <div className="bg-white border-4 border-yellow-500 p-4 shadow-[4px_4px_0_0_#EAB308]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-yellow-700 uppercase mb-1">
                    Pending
                  </p>
                  <p className="text-3xl font-black text-gray-900">
                    {stats.pending}
                  </p>
                </div>
                <FontAwesomeIcon
                  icon={faClock}
                  size="lg"
                  className="text-yellow-500"
                />
              </div>
            </div>

            <div className="bg-white border-4 border-green-500 p-4 shadow-[4px_4px_0_0_#22C55E]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-green-700 uppercase mb-1">
                    Approved
                  </p>
                  <p className="text-3xl font-black text-gray-900">
                    {stats.approved}
                  </p>
                </div>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="lg"
                  className="text-green-500"
                />
              </div>
            </div>

            <div className="bg-white border-4 border-red-500 p-4 shadow-[4px_4px_0_0_#EF4444]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-red-700 uppercase mb-1">
                    Rejected
                  </p>
                  <p className="text-3xl font-black text-gray-900">
                    {stats.rejected}
                  </p>
                </div>
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  size="lg"
                  className="text-red-500"
                />
              </div>
            </div>

            <div className="bg-white border-4 border-blue-500 p-4 shadow-[4px_4px_0_0_#3B82F6]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-blue-700 uppercase mb-1">
                    Total Amount
                  </p>
                  <p className="text-2xl font-black text-gray-900">
                    $
                    {(stats.totalAmount || 0).toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <FontAwesomeIcon
                  icon={faDollarSign}
                  size="lg"
                  className="text-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white border-4 border-gray-900 p-4 mb-6 shadow-[4px_4px_0_0_#000000]">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search by project or founder..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 focus:border-gray-900 focus:outline-none font-medium"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faFilter} className="text-gray-600" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border-2 border-gray-300 focus:border-gray-900 focus:outline-none font-medium"
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Under Review">Under Review</option>
                </select>
              </div>

              {/* Stage Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={filterStage}
                  onChange={(e) => setFilterStage(e.target.value)}
                  className="px-3 py-2 border-2 border-gray-300 focus:border-gray-900 focus:outline-none font-medium"
                >
                  <option value="all">All Stages</option>
                  <option value="Idea">Idea</option>
                  <option value="MVP">MVP</option>
                  <option value="Growth">Growth</option>
                  <option value="Scale">Scale</option>
                </select>
              </div>
            </div>
          </div>

          {/* Funding Requests Table */}
          {loading ? (
            <div className="bg-white border-4 border-gray-900 p-8 text-center shadow-[4px_4px_0_0_#000000]">
              <FontAwesomeIcon
                icon={faSpinner}
                className="animate-spin mx-auto text-gray-400 mb-4 text-4xl"
              />
              <p className="text-gray-600 font-medium">
                Loading funding requests...
              </p>
            </div>
          ) : filteredRequests.length > 0 ? (
            <div className="bg-white border-4 border-gray-900 overflow-hidden shadow-[4px_4px_0_0_#000000]">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900 text-white border-b-4 border-gray-900">
                    <th className="px-6 py-4 text-left font-black uppercase text-sm">
                      Project
                    </th>
                    <th className="px-6 py-4 text-left font-black uppercase text-sm">
                      Founder
                    </th>
                    <th className="px-6 py-4 text-left font-black uppercase text-sm">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left font-black uppercase text-sm">
                      Stage
                    </th>
                    <th className="px-6 py-4 text-left font-black uppercase text-sm">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-black uppercase text-sm">
                      Date
                    </th>
                    <th className="px-6 py-4 text-center font-black uppercase text-sm">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request, index) => (
                    <tr
                      key={request.id}
                      className={`border-b-2 border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-gray-900">
                            {request.project?.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {request.project?.domain}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          {request.founders && request.founders.length > 0 ? (
                            <>
                              <p className="font-bold text-gray-900">
                                {request.founders[0]?.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {request.founders[0]?.email}
                              </p>
                            </>
                          ) : (
                            <p className="text-gray-500">-</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-black text-gray-900">
                          $
                          {parseFloat(request.amount || 0).toLocaleString(
                            "en-US",
                            { maximumFractionDigits: 2 },
                          )}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold border-2 border-gray-400 uppercase">
                          {request.project?.stage || request.funding_stage}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 border-2 font-bold text-sm uppercase ${getStatusColor(request.status)}`}
                        >
                          {getStatusIcon(request.status)}
                          {request.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(request.requested_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowDetails(true);
                          }}
                          className="inline-flex items-center justify-center w-10 h-10 bg-gray-900 text-white border-2 border-black hover:bg-gray-700 font-bold transition-all"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white border-4 border-gray-900 p-8 text-center shadow-[4px_4px_0_0_#000000]">
              <FontAwesomeIcon
                icon={faDollarSign}
                className="mx-auto text-gray-300 mb-4 text-5xl"
              />
              <p className="text-gray-600 font-medium">
                No funding requests found
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
