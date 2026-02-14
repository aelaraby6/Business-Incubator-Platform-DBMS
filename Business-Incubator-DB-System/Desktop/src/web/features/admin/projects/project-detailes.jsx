import { Check, X, XCircle, Calendar, Users, Target, FileText, Code, Globe, Github, DollarSign, MapPin, Lightbulb, Wrench } from 'lucide-react';

// Project Details Component
const ProjectDetails = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-6xl max-h-[90vh] border-4 border-gray-900 shadow-[8px_8px_0_0_#111827] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b-4 border-gray-900 flex items-center justify-between bg-blue-950">
                    <h2 className="text-2xl font-black uppercase text-white">
                        Project Details
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-300 transition-all"
                    >
                        <XCircle size={32} strokeWidth={3} />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto flex-1 bg-gray-50 p-6">
                    {/* Project Title & Description */}
                    <div className="bg-white border-4 border-gray-900 p-6 mb-6 shadow-[4px_4px_0_0_#111827]">
                        <h3 className="text-3xl font-black uppercase text-blue-950 mb-3">
                            {project.title || project.name}
                        </h3>
                        <p className="text-lg text-gray-700 font-medium italic">
                            {project.short_description}
                        </p>
                    </div>

                    {/* Basic Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Founder */}
                        <div className="bg-white border-4 border-gray-900 p-5 shadow-[3px_3px_0_0_#111827]">
                            <div className="flex items-center gap-3 mb-2">
                                <Users size={20} className="text-blue-900" strokeWidth={3} />
                                <span className="text-sm font-black uppercase text-gray-600">Founder</span>
                            </div>
                            <p className="text-xl font-bold text-blue-950">{project.founder}</p>
                        </div>

                        {/* Domain */}
                        <div className="bg-white border-4 border-gray-900 p-5 shadow-[3px_3px_0_0_#111827]">
                            <div className="flex items-center gap-3 mb-2">
                                <Target size={20} className="text-blue-900" strokeWidth={3} />
                                <span className="text-sm font-black uppercase text-gray-600">Domain</span>
                            </div>
                            <p className="text-xl font-bold text-blue-950">{project.domain}</p>
                        </div>

                        {/* Stage */}
                        <div className="bg-white border-4 border-gray-900 p-5 shadow-[3px_3px_0_0_#111827]">
                            <div className="flex items-center gap-3 mb-2">
                                <FileText size={20} className="text-blue-900" strokeWidth={3} />
                                <span className="text-sm font-black uppercase text-gray-600">Stage</span>
                            </div>
                            <span className="inline-block px-4 py-2 text-sm font-black uppercase border-2 border-blue-900 bg-blue-100 text-blue-900">
                                {project.stage === 'in-progress' ? 'In Progress' : project.stage}
                            </span>
                        </div>

                        {/* Team Type */}
                        <div className="bg-white border-4 border-gray-900 p-5 shadow-[3px_3px_0_0_#111827]">
                            <div className="flex items-center gap-3 mb-2">
                                <Users size={20} className="text-blue-900" strokeWidth={3} />
                                <span className="text-sm font-black uppercase text-gray-600">Team Type</span>
                            </div>
                            <p className="text-xl font-bold text-blue-950 capitalize">
                                {project.team_type?.replace('-', ' ') || 'Individual'}
                            </p>
                        </div>

                        {/* Team Size */}
                        <div className="bg-white border-4 border-gray-900 p-5 shadow-[3px_3px_0_0_#111827]">
                            <div className="flex items-center gap-3 mb-2">
                                <Users size={20} className="text-blue-900" strokeWidth={3} />
                                <span className="text-sm font-black uppercase text-gray-600">Team Size</span>
                            </div>
                            <p className="text-xl font-bold text-blue-950">
                                {project.team_count} {project.team_count === 1 ? 'Member' : 'Members'}
                            </p>
                        </div>

                        {/* Submitted Date */}
                        <div className="bg-white border-4 border-gray-900 p-5 shadow-[3px_3px_0_0_#111827]">
                            <div className="flex items-center gap-3 mb-2">
                                <Calendar size={20} className="text-blue-900" strokeWidth={3} />
                                <span className="text-sm font-black uppercase text-gray-600">Submitted</span>
                            </div>
                            <p className="text-xl font-bold text-blue-950">{project.submitted_at}</p>
                        </div>

                        {/* Funding Stage */}
                        {project.funding_stage && (
                            <div className="bg-white border-4 border-gray-900 p-5 shadow-[3px_3px_0_0_#111827]">
                                <div className="flex items-center gap-3 mb-2">
                                    <DollarSign size={20} className="text-blue-900" strokeWidth={3} />
                                    <span className="text-sm font-black uppercase text-gray-600">Funding Stage</span>
                                </div>
                                <p className="text-xl font-bold text-blue-950 capitalize">{project.funding_stage}</p>
                            </div>
                        )}

                        {/* Target Market */}
                        {project.target_market && (
                            <div className="bg-white border-4 border-gray-900 p-5 shadow-[3px_3px_0_0_#111827]">
                                <div className="flex items-center gap-3 mb-2">
                                    <MapPin size={20} className="text-blue-900" strokeWidth={3} />
                                    <span className="text-sm font-black uppercase text-gray-600">Target Market</span>
                                </div>
                                <p className="text-xl font-bold text-blue-950">{project.target_market}</p>
                            </div>
                        )}

                        {/* Status */}
                        <div className="bg-white border-4 border-gray-900 p-5 shadow-[3px_3px_0_0_#111827]">
                            <div className="flex items-center gap-3 mb-2">
                                <Check size={20} className="text-blue-900" strokeWidth={3} />
                                <span className="text-sm font-black uppercase text-gray-600">Approval Status</span>
                            </div>
                            {project.approval_status === 'pending' && (
                                <span className="inline-block bg-blue-700 text-white px-4 py-2 text-sm font-black uppercase border-2 border-blue-800">
                                    ⏳ Pending
                                </span>
                            )}
                            {project.approval_status === 'approved' && (
                                <span className="inline-block bg-blue-900 text-white px-4 py-2 text-sm font-black uppercase border-2 border-blue-950">
                                    ✓ Approved
                                </span>
                            )}
                            {project.approval_status === 'rejected' && (
                                <span className="inline-block bg-gray-600 text-white px-4 py-2 text-sm font-black uppercase border-2 border-gray-700">
                                    ✗ Rejected
                                </span>
                            )}
                        </div>

                        {/* Looking for Co-founders */}
                        {project.looking_for_cofounders && (
                            <div className="bg-blue-50 border-4 border-blue-900 p-5 shadow-[3px_3px_0_0_#1e3a8a]">
                                <div className="flex items-center gap-3 mb-2">
                                    <Users size={20} className="text-blue-900" strokeWidth={3} />
                                    <span className="text-sm font-black uppercase text-blue-900">Looking for Co-founders</span>
                                </div>
                                <p className="text-xl font-black text-blue-950">✓ Yes</p>
                            </div>
                        )}
                    </div>

                    {/* Problem Statement */}
                    {project.problem && (
                        <div className="bg-white border-4 border-gray-900 p-6 mb-6 shadow-[4px_4px_0_0_#111827]">
                            <div className="flex items-center gap-3 mb-4">
                                <Lightbulb size={24} className="text-blue-900" strokeWidth={3} />
                                <h4 className="text-xl font-black uppercase text-blue-950">Problem Statement</h4>
                            </div>
                            <p className="text-base text-gray-700 font-medium leading-relaxed">
                                {project.problem}
                            </p>
                        </div>
                    )}

                    {/* Solution */}
                    {project.solution && (
                        <div className="bg-white border-4 border-gray-900 p-6 mb-6 shadow-[4px_4px_0_0_#111827]">
                            <div className="flex items-center gap-3 mb-4">
                                <Wrench size={24} className="text-blue-900" strokeWidth={3} />
                                <h4 className="text-xl font-black uppercase text-blue-950">Solution</h4>
                            </div>
                            <p className="text-base text-gray-700 font-medium leading-relaxed">
                                {project.solution}
                            </p>
                        </div>
                    )}

                    {/* Tech Stack */}
                    {project.tech_stack && (
                        <div className="bg-white border-4 border-gray-900 p-6 mb-6 shadow-[4px_4px_0_0_#111827]">
                            <div className="flex items-center gap-3 mb-4">
                                <Code size={24} className="text-blue-900" strokeWidth={3} />
                                <h4 className="text-xl font-black uppercase text-blue-950">Tech Stack</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.tech_stack.split(',').map((tech, index) => (
                                    <span 
                                        key={index}
                                        className="bg-blue-100 text-blue-900 px-4 py-2 text-sm font-bold uppercase border-2 border-blue-900"
                                    >
                                        {tech.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Links Section */}
                    {(project.github_url || project.demo_url) && (
                        <div className="bg-white border-4 border-gray-900 p-6 mb-6 shadow-[4px_4px_0_0_#111827]">
                            <div className="flex items-center gap-3 mb-4">
                                <Globe size={24} className="text-blue-900" strokeWidth={3} />
                                <h4 className="text-xl font-black uppercase text-blue-950">Project Links</h4>
                            </div>
                            <div className="flex flex-col gap-3">
                                {project.github_url && (
                                    <a 
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 bg-gray-900 text-white px-5 py-3 font-bold uppercase border-2 border-gray-900 hover:bg-gray-800 transition-all"
                                    >
                                        <Github size={20} strokeWidth={3} />
                                        View on GitHub
                                    </a>
                                )}
                                {project.demo_url && (
                                    <a 
                                        href={project.demo_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 bg-blue-900 text-white px-5 py-3 font-bold uppercase border-2 border-blue-950 hover:bg-blue-950 transition-all"
                                    >
                                        <Globe size={20} strokeWidth={3} />
                                        View Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    {project.approval_status === 'pending' && (
                        <div className="bg-white border-4 border-gray-900 p-6 shadow-[4px_4px_0_0_#111827]">
                            <h4 className="text-lg font-black uppercase text-blue-950 mb-4">Actions</h4>
                            <div className="flex gap-4">
                                <button className="flex-1 bg-blue-900 text-white px-6 py-4 font-black text-sm uppercase border-4 border-blue-950 hover:bg-blue-950 transition-all flex items-center justify-center gap-2 shadow-[3px_3px_0_0_#1e3a8a]">
                                    <Check size={20} strokeWidth={3} />
                                    Approve Project
                                </button>
                                <button className="flex-1 bg-gray-600 text-white px-6 py-4 font-black text-sm uppercase border-4 border-gray-700 hover:bg-gray-700 transition-all flex items-center justify-center gap-2 shadow-[3px_3px_0_0_#4b5563]">
                                    <X size={20} strokeWidth={3} />
                                    Reject Project
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;