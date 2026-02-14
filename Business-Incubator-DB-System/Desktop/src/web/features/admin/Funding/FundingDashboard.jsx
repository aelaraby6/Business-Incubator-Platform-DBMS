import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faTrendingUp,
  faSpinner,
  faDollarSign,
  faTarget,
} from "@fortawesome/free-solid-svg-icons";

const electron = window.electron || {};
const invoke =
  electron.invoke ||
  (async () => {
    console.error("Electron IPC not available");
    return [];
  });

export default function FundingDashboard() {
  const [dashboardData, setDashboardData] = useState([]);
  const [fundingByStage, setFundingByStage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({
    totalProjects: 0,
    totalRequested: 0,
    totalApproved: 0,
    totalPending: 0,
  });

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [dashData, stageData] = await Promise.all([
        invoke("funding:getDashboard"),
        invoke("funding:getByStage"),
      ]);

      setDashboardData(dashData?.data || []);
      setFundingByStage(stageData?.data || []);

      // Calculate summary
      if (dashData?.data) {
        const summary = {
          totalProjects: dashData.data.length,
          totalRequested: dashData.data.reduce(
            (sum, p) => sum + (parseFloat(p.total_amount) || 0),
            0,
          ),
          totalApproved: dashData.data.reduce(
            (sum, p) => sum + (parseFloat(p.approved_amount) || 0),
            0,
          ),
          totalPending: dashData.data.reduce(
            (sum, p) => sum + (parseFloat(p.pending_amount) || 0),
            0,
          ),
        };
        setSummary(summary);
      }
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboardData();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 uppercase mb-2">
          Funding Dashboard
        </h1>
        <p className="text-gray-600">
          Overview of funding requests and approvals by project and stage
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border-4 border-purple-500 p-4 shadow-[4px_4px_0_0_#A855F7]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-purple-700 uppercase mb-1">
                Total Projects
              </p>
              <p className="text-3xl font-black text-gray-900">
                {summary.totalProjects}
              </p>
            </div>
            <FontAwesomeIcon
              icon={faTarget}
              size="lg"
              className="text-purple-500"
            />
          </div>
        </div>

        <div className="bg-white border-4 border-blue-500 p-4 shadow-[4px_4px_0_0_#3B82F6]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-blue-700 uppercase mb-1">
                Total Requested
              </p>
              <p className="text-2xl font-black text-gray-900">
                $
                {(summary.totalRequested || 0).toLocaleString("en-US", {
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

        <div className="bg-white border-4 border-green-500 p-4 shadow-[4px_4px_0_0_#22C55E]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-green-700 uppercase mb-1">
                Total Approved
              </p>
              <p className="text-2xl font-black text-gray-900">
                $
                {(summary.totalApproved || 0).toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <FontAwesomeIcon
              icon={faTrendingUp}
              size="lg"
              className="text-green-500"
            />
          </div>
        </div>

        <div className="bg-white border-4 border-yellow-500 p-4 shadow-[4px_4px_0_0_#EAB308]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-yellow-700 uppercase mb-1">
                Total Pending
              </p>
              <p className="text-2xl font-black text-gray-900">
                $
                {(summary.totalPending || 0).toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <FontAwesomeIcon
              icon={faChartBar}
              size="lg"
              className="text-yellow-500"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white border-4 border-gray-900 p-8 text-center shadow-[4px_4px_0_0_#000000]">
          <FontAwesomeIcon
            icon={faSpinner}
            className="animate-spin mx-auto text-gray-400 mb-4 text-4xl"
          />
          <p className="text-gray-600 font-medium">Loading dashboard data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Projects by Funding Status */}
          <div className="bg-white border-4 border-gray-900 p-6 shadow-[4px_4px_0_0_#000000]">
            <h2 className="text-2xl font-black text-gray-900 uppercase mb-6 border-b-4 border-gray-900 pb-4">
              Projects by Funding Status
            </h2>

            {dashboardData.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.slice(0, 10).map((project, index) => (
                  <div
                    key={project.id}
                    className={`border-2 border-gray-300 p-4 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-black text-gray-900">
                          {project.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {project.domain}
                        </p>
                      </div>
                      <span className="inline-block px-2 py-1 bg-gray-200 text-gray-900 text-xs font-bold border-2 border-gray-400 uppercase">
                        {project.stage}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-xs font-bold text-gray-600 uppercase">
                          Requests
                        </p>
                        <p className="text-xl font-black text-gray-900">
                          {project.total_requests || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-green-700 uppercase">
                          Approved
                        </p>
                        <p className="text-lg font-black text-green-600">
                          $
                          {(
                            parseFloat(project.approved_amount) || 0
                          ).toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-yellow-700 uppercase">
                          Pending
                        </p>
                        <p className="text-lg font-black text-yellow-600">
                          $
                          {(
                            parseFloat(project.pending_amount) || 0
                          ).toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No project data available
              </p>
            )}
          </div>

          {/* Funding Status by Stage */}
          <div className="bg-white border-4 border-gray-900 p-6 shadow-[4px_4px_0_0_#000000]">
            <h2 className="text-2xl font-black text-gray-900 uppercase mb-6 border-b-4 border-gray-900 pb-4">
              Funding Status by Stage
            </h2>

            {fundingByStage.length > 0 ? (
              <div className="space-y-4">
                {fundingByStage.map((stage) => (
                  <div
                    key={stage.stage}
                    className="border-2 border-gray-300 p-4 bg-gray-50"
                  >
                    <div className="mb-3">
                      <p className="font-black text-gray-900 uppercase">
                        {stage.stage}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {stage.statuses &&
                        Object.entries(stage.statuses).map(
                          ([statusKey, statusData]) => (
                            <div
                              key={statusKey}
                              className="flex items-center justify-between text-sm"
                            >
                              <div className="flex items-center gap-2">
                                <span className="capitalize font-bold text-gray-700">
                                  {statusKey}
                                </span>
                                <span className="text-gray-600">
                                  ({statusData.count})
                                </span>
                              </div>
                              <span className="font-black text-gray-900">
                                $
                                {(
                                  parseFloat(statusData.amount) || 0
                                ).toLocaleString("en-US", {
                                  maximumFractionDigits: 0,
                                })}
                              </span>
                            </div>
                          ),
                        )}
                      <div className="border-t-2 border-gray-300 pt-2 mt-2 font-bold flex items-center justify-between">
                        <span>Total</span>
                        <span className="text-gray-900">
                          $
                          {(stage.total_amount || 0).toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No stage data available
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
