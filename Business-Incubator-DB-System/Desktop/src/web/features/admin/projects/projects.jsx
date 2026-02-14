import { useState, useEffect } from 'react';
import { Eye, Search, FolderOpen, Loader2, PlayCircle, CheckCircle, Check, X } from 'lucide-react';
import ProjectDetails from './project-detailes';

const electron = window.electron || {};
const invoke = electron.invoke || (async () => {
    console.error('Electron IPC not available');
    return [];
});

export default function Projects() {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({
        total: 0,
        idea: 0,
        in_progress: 0,
        completed: 0
    });

    // Fetch all projects
    const fetchProjects = async () => {
        setLoading(true);
        try {
            const data = await invoke('projects:getAll');
            setProjects(data || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
        setLoading(false);
    };

    // Fetch stats
    const fetchStats = async () => {
        try {
            const data = await invoke('projects:getStats');
            setStats({
                total: parseInt(data?.total) || 0,
                idea: parseInt(data?.idea) || 0,
                in_progress: parseInt(data?.in_progress) || 0,
                completed: parseInt(data?.completed) || 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            if (isMounted) {
                await fetchProjects();
                await fetchStats();
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, []);

    // Update project status
    const handleUpdateStatus = async (projectId, newStatus) => {
        try {
            await invoke('projects:updateStatus', { id: projectId, status: newStatus });

            // Refresh projects and stats
            await fetchProjects();
            await fetchStats();

            // Update selected project if it's open
            if (selectedProject && selectedProject.id === projectId) {
                const updatedProject = await invoke('projects:getById', projectId);
                setSelectedProject(updatedProject);
            }
        } catch (error) {
            console.error('Error updating project status:', error);
            alert('Failed to update project status');
        }
    };

    // Toggle approved status
    // eslint-disable-next-line no-unused-vars
    const handleToggleApproved = async (projectId, currentApproved) => {
        try {
            await invoke('projects:toggleApproved', projectId);

            await fetchProjects();
            await fetchStats();

            if (selectedProject && selectedProject.id === projectId) {
                const updatedProject = await invoke('projects:getById', projectId);
                setSelectedProject(updatedProject);
            }
        } catch (error) {
            console.error('Error toggling approved status:', error);
            alert('Failed to update approval status');
        }
    };

    const filteredProjects = projects.filter(project => {
        const matchesFilter = filter === 'all' || project.stage === filter;
        const matchesSearch = project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.domain?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleViewProject = async (project) => {
        try {
            const fullProject = await invoke('projects:getById', project.id);
            setSelectedProject(fullProject);
            setShowDetails(true);
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };

    const handleCloseDetails = () => {
        setShowDetails(false);
        setSelectedProject(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b-4 border-blue-900">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <h1 className="text-4xl font-black uppercase tracking-tight mb-2 text-blue-950">
                        Projects Management
                    </h1>
                    <p className="text-gray-600 font-medium">
                        Manage and track all projects
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white border-4 border-gray-900 p-6 shadow-[4px_4px_0_0_#111827]">
                        <div className="text-sm font-bold uppercase text-gray-500 mb-2">Total Projects</div>
                        <div className="text-4xl font-black text-blue-950">{stats.total}</div>
                    </div>

                    <div className="bg-blue-50 border-4 border-blue-900 p-6 shadow-[4px_4px_0_0_#1e3a8a]">
                        <div className="text-sm font-bold uppercase text-blue-900 mb-2">Idea Stage</div>
                        <div className="text-4xl font-black text-blue-800">{stats.idea}</div>
                    </div>

                    <div className="bg-blue-50 border-4 border-blue-900 p-6 shadow-[4px_4px_0_0_#1e3a8a]">
                        <div className="text-sm font-bold uppercase text-blue-900 mb-2">In Progress</div>
                        <div className="text-4xl font-black text-blue-800">{stats.in_progress}</div>
                    </div>

                    <div className="bg-gray-100 border-4 border-gray-600 p-6 shadow-[4px_4px_0_0_#4b5563]">
                        <div className="text-sm font-bold uppercase text-gray-600 mb-2">Completed</div>
                        <div className="text-4xl font-black text-gray-700">{stats.completed}</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white border-4 border-gray-900 p-6 mb-8 shadow-[4px_4px_0_0_#111827]">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border-4 border-gray-900 px-4 py-3 pl-12 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-300"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-6 py-3 font-bold uppercase border-4 transition-all ${filter === 'all'
                                        ? 'bg-blue-900 text-white border-blue-950'
                                        : 'bg-white text-gray-700 border-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('idea')}
                                className={`px-6 py-3 font-bold uppercase border-4 transition-all ${filter === 'idea'
                                        ? 'bg-blue-900 text-white border-blue-950'
                                        : 'bg-white text-gray-700 border-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                Idea
                            </button>
                            <button
                                onClick={() => setFilter('in-progress')}
                                className={`px-6 py-3 font-bold uppercase border-4 transition-all ${filter === 'in-progress'
                                        ? 'bg-blue-900 text-white border-blue-950'
                                        : 'bg-white text-gray-700 border-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                In Progress
                            </button>
                            <button
                                onClick={() => setFilter('completed')}
                                className={`px-6 py-3 font-bold uppercase border-4 transition-all ${filter === 'completed'
                                        ? 'bg-gray-600 text-white border-gray-700'
                                        : 'bg-white text-gray-700 border-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                Completed
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-white border-4 border-gray-900 shadow-[4px_4px_0_0_#111827] mb-8">
                        <Loader2 className="text-blue-900 animate-spin mb-4" size={48} strokeWidth={3} />
                        <p className="text-gray-700 text-xl font-bold uppercase">
                            Loading projects...
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Projects Table */}
                        {filteredProjects.length > 0 ? (
                            <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0_0_#111827] mb-8 overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-blue-950 text-white border-b-4 border-gray-900">
                                        <tr>
                                            <th className="text-left p-4 font-black uppercase text-sm">Project</th>
                                            <th className="text-left p-4 font-black uppercase text-sm">Domain</th>
                                            <th className="text-left p-4 font-black uppercase text-sm">Stage</th>
                                            <th className="text-left p-4 font-black uppercase text-sm">Team Type</th>
                                            <th className="text-left p-4 font-black uppercase text-sm">Created</th>
                                            <th className="text-left p-4 font-black uppercase text-sm">Status</th>
                                            <th className="text-center p-4 font-black uppercase text-sm">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProjects.map((project, index) => (
                                            <tr key={project.id} className={`border-b-4 border-gray-900 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                <td className="p-4">
                                                    <div className="font-black text-lg text-blue-950 min-w-[200px]">{project.name}</div>
                                                    <div className="text-sm text-gray-600 font-medium italic line-clamp-2">{project.short_description}</div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="bg-blue-900 text-white px-3 py-1 text-xs font-black uppercase border-2 border-blue-950 whitespace-nowrap">
                                                        {project.domain}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="px-3 py-1 text-xs font-black uppercase border-2 border-blue-900 bg-blue-100 text-blue-900 whitespace-nowrap">
                                                        {project.stage === 'in-progress' ? 'In Progress' : project.stage}
                                                    </span>
                                                </td>
                                                <td className="p-4 font-bold text-gray-700 capitalize whitespace-nowrap">
                                                    {project.team_type?.replace('-', ' ') || 'N/A'}
                                                </td>
                                                <td className="p-4 text-gray-600 font-medium whitespace-nowrap">
                                                    {new Date(project.created_at).toLocaleDateString('en-GB')}
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex flex-col gap-2">
                                                        {project.status === 'idea' && (
                                                            <span className="bg-blue-500 text-white px-3 py-1 text-xs font-black uppercase border-2 border-blue-600 whitespace-nowrap">
                                                                💡 Idea
                                                            </span>
                                                        )}
                                                        {project.status === 'in-progress' && (
                                                            <span className="bg-blue-700 text-white px-3 py-1 text-xs font-black uppercase border-2 border-blue-800 whitespace-nowrap">
                                                                ⚙️ In Progress
                                                            </span>
                                                        )}
                                                        {project.status === 'completed' && (
                                                            <span className="bg-gray-600 text-white px-3 py-1 text-xs font-black uppercase border-2 border-gray-700 whitespace-nowrap">
                                                                ✓ Completed
                                                            </span>
                                                        )}

                                                        {/* Approval Status */}
                                                        {project.approved ? (
                                                            <span className="bg-green-600 text-white px-3 py-1 text-xs font-black uppercase border-2 border-green-700 whitespace-nowrap">
                                                                ✓ Approved
                                                            </span>
                                                        ) : (
                                                            <span className="bg-red-600 text-white px-3 py-1 text-xs font-black uppercase border-2 border-red-700 whitespace-nowrap">
                                                                ✗ Rejected
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex flex-col gap-2 items-center min-w-[120px]">
                                                        <button
                                                            onClick={() => handleViewProject(project)}
                                                            className="bg-gray-700 text-white px-4 py-2 font-black text-sm uppercase border-2 border-gray-800 hover:bg-gray-800 transition-all flex items-center gap-2 w-full justify-center"
                                                        >
                                                            <Eye size={16} />
                                                            View
                                                        </button>

                                                        {project.status === 'idea' && (
                                                            <button
                                                                onClick={() => handleUpdateStatus(project.id, 'in-progress')}
                                                                className="bg-blue-900 text-white px-4 py-2 font-black text-sm uppercase border-2 border-blue-950 hover:bg-blue-950 transition-all flex items-center gap-1 w-full justify-center"
                                                            >
                                                                <PlayCircle size={16} />
                                                                Start
                                                            </button>
                                                        )}

                                                        {project.status === 'in-progress' && (
                                                            <button
                                                                onClick={() => handleUpdateStatus(project.id, 'completed')}
                                                                className="bg-gray-600 text-white px-4 py-2 font-black text-sm uppercase border-2 border-gray-700 hover:bg-gray-700 transition-all flex items-center gap-1 w-full justify-center"
                                                            >
                                                                <CheckCircle size={16} />
                                                                Complete
                                                            </button>
                                                        )}

                                                        {/* Toggle Approval Button */}
                                                        <button
                                                            onClick={() => handleToggleApproved(project.id, project.approved)}
                                                            className={`px-4 py-2 font-black text-sm uppercase border-2 transition-all flex items-center gap-1 w-full justify-center ${project.approved
                                                                    ? 'bg-red-600 text-white border-red-700 hover:bg-red-700'
                                                                    : 'bg-green-600 text-white border-green-700 hover:bg-green-700'
                                                                }`}
                                                        >
                                                            {project.approved ? (
                                                                <>
                                                                    <X size={16} />
                                                                    Reject
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Check size={16} />
                                                                    Approve
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="bg-white border-4 border-gray-900 p-16 text-center mb-8 shadow-[4px_4px_0_0_#111827]">
                                <FolderOpen size={64} className="mx-auto mb-4 text-gray-400" />
                                <h3 className="text-2xl font-black uppercase mb-2 text-blue-950">No Projects Found</h3>
                                <p className="text-gray-600 font-medium">Try adjusting your filters</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Project Details Modal */}
            {showDetails && (
                <ProjectDetails
                    project={selectedProject}
                    onClose={handleCloseDetails}
                    onUpdateStatus={handleUpdateStatus}
                />
            )}
        </div>
    );
}