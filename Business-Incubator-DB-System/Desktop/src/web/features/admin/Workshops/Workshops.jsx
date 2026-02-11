import React , { useState , useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faSearch,
    faDownload,
    faCalendar,
    faUsers,
    faFileText,
    faBolt,
    faCheckCircle,
    faCircleNotch,
    faInbox,
    faBook,
    faThumbtack,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import AddWorkshopForm from './AddWorkshopForm';
import WorkshopTable from './WorkshopTable';
import WorkshopDetails from './WorkshopDetails';
import { workshopService } from '../../../services/workshopService';



const Workshops = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    
    const fetchWorkshops = async () => {
        setLoading(true);
        try {
            const data = await workshopService.getWorkshops();
            setWorkshops(data);
        } catch (error) {
            console.error('Error fetching workshops:', error);
        }
        setLoading(false);
    };

    // Fetch workshops on mount
    useEffect(() => {
        const loadWorkshops = async () => {
            setLoading(true);
            try {
                const data = await workshopService.getWorkshops();
                setWorkshops(data);
            } catch (error) {
                console.error('Error fetching workshops:', error);
            }
            setLoading(false);
        };
        
        loadWorkshops();
    }, []);


    const handleAddWorkshop = async (formData) => {
        try {
            await workshopService.createWorkshop(formData);
            setShowAddForm(false);
            fetchWorkshops();
        } catch (error) {
            console.error('Error creating workshop:', error);
        }
    };

    const handleDeleteWorkshop = async (id) => {
        if (window.confirm('Are you sure you want to delete this workshop?')) {
            try {
                await workshopService.deleteWorkshop(id);
                fetchWorkshops();
            } catch (error) {
                console.error('Error deleting workshop:', error);
            }
        }
    };

    const handleViewDetails = (workshop) => {
        setSelectedWorkshop(workshop);
        setShowDetailsModal(true);
    };

    const handleExportReport = async (type) => {
        try {
            let filePath;
            if (type === 'attendance') {
                filePath = await workshopService.exportAttendanceReport();
                alert('✅ Attendance report downloaded successfully!\n\nSaved to: ' + filePath);
            } else if (type === 'feedback') {
                filePath = await workshopService.exportFeedbackReport();
                alert('✅ Feedback report downloaded successfully!\n\nSaved to: ' + filePath);
            }
        } catch (error) {
            console.error('Error exporting report:', error);
            alert('❌ Error exporting report. Please try again.');
        }
    };

    // Filter workshops
    const filteredWorkshops = workshops.filter((workshop) => {
        const matchesSearch = workshop.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            workshop.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            filterStatus === 'all' || workshop.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="flex-1 overflow-y-auto bg-white">
            <div className="p-6 md:p-8 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-black text-black mb-2 leading-tight">
                                <FontAwesomeIcon icon={faFileText} className="mr-4 text-blue-600" />
                                Workshops
                            </h1>
                            <p className="text-lg md:text-xl text-gray-700 font-bold">
                                <FontAwesomeIcon icon={faBook} className="mr-2" />
                                Create, manage & track all your workshops
                            </p>
                        </div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="flex items-center gap-2 bg-orange-300 text-black px-6 md:px-8 py-4 border-4 border-black
                            hover:shadow-lg hover:-translate-y-1 transition-all duration-200 font-black text-base md:text-lg rounded-2xl"
                        >
                            <FontAwesomeIcon icon={faPlus} size="lg" />
                            New Workshop
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="p-6 bg-blue-300 border-4 border-black rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="text-4xl text-blue-600">
                                <FontAwesomeIcon icon={faCalendar} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-700">Total Workshops</p>
                                <p className="text-3xl font-black text-black">{workshops.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-green-300 border-4 border-black rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="text-4xl text-green-600">
                                <FontAwesomeIcon icon={faBolt} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-700">Ongoing</p>
                                <p className="text-3xl font-black text-black">
                                    {workshops.filter((w) => w.status === 'ongoing').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-orange-300 border-4 border-black rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="text-4xl text-orange-600">
                                <FontAwesomeIcon icon={faUsers} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-700">Enrolled</p>
                                <p className="text-3xl font-black text-black">
                                    {workshops.reduce((acc, w) => acc + (w.enrolledCount || 0), 0)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-blue-300 border-4 border-black rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="text-4xl text-blue-600">
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-700">Completed</p>
                                <p className="text-3xl font-black text-black">
                                    {workshops.filter((w) => w.status === 'completed').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="flex-1 relative">
                            <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-4 text-black" size="lg" />
                            <input
                                type="text"
                                placeholder="Search workshops..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-4 border-black bg-white
                                placeholder-gray-600 font-bold focus:outline-none focus:ring-4 focus:ring-orange-300
                                rounded-2xl text-lg"
                            />
                        </div>

                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-3 border-4 border-black bg-white font-bold
                            cursor-pointer rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-300"
                        >
                            <option value="all">All Status</option>
                            <option value="scheduled">📋 Scheduled</option>
                            <option value="ongoing">⚡ Ongoing</option>
                            <option value="completed">✅ Completed</option>
                        </select>

                        <div className="flex gap-2">
                            <button
                                onClick={() => handleExportReport('attendance')}
                                className="flex items-center gap-2 px-4 py-3 border-4 border-black
                                bg-orange-300 hover:shadow-lg hover:-translate-y-1 font-bold transition-all rounded-2xl text-black"
                            >
                                <FontAwesomeIcon icon={faDownload} size="lg" />
                                Attendance
                            </button>
                            <button
                                onClick={() => handleExportReport('feedback')}
                                className="flex items-center gap-2 px-4 py-3 border-4 border-black
                                bg-orange-300 hover:shadow-lg hover:-translate-y-1 font-bold transition-all rounded-2xl text-black"
                            >
                                <FontAwesomeIcon icon={faDownload} size="lg" />
                                Feedback
                            </button>
                        </div>
                    </div>
                </div>

                {/* Workshops Table */}
                {loading ? (
                    <div className="flex items-center justify-center py-12 border-4 border-black bg-orange-100 rounded-2xl">
                        <div className="text-center">
                            <div className="inline-block animate-spin mb-4 text-4xl">
                                <FontAwesomeIcon icon={faCircleNotch} />
                            </div>
                            <p className="text-gray-700 font-bold text-lg">Loading workshops...</p>
                        </div>
                    </div>
                ) : filteredWorkshops.length > 0 ? (
                    <WorkshopTable
                        workshops={filteredWorkshops}
                        onView={handleViewDetails}
                        onDelete={handleDeleteWorkshop}
                    />
                ) : (
                    <div className="border-4 border-black bg-white p-12 text-center rounded-2xl">
                        <p className="text-5xl mb-4">
                            <FontAwesomeIcon icon={faInbox} />
                        </p>
                        <p className="text-gray-700 font-bold text-lg mb-4">
                            No workshops found
                        </p>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="inline-flex items-center gap-2 bg-orange-300 text-black px-6 py-3
                            border-4 border-black hover:shadow-lg hover:-translate-y-1 transition-all font-bold rounded-2xl"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            Create First Workshop
                        </button>
                    </div>
                )}

                {/* Add Workshop Modal */}
                {showAddForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                        <div className="bg-white border-4 border-black w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                            <div className="p-6 border-b-4 border-black flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
                                <h2 className="text-3xl font-black flex items-center gap-3">
                                    <FontAwesomeIcon icon={faThumbtack} className="text-blue-600" size="lg" />
                                    Add New Workshop
                                </h2>
                                <button
                                    onClick={() => setShowAddForm(false)}
                                    className="text-gray-600 hover:text-black font-black text-3xl hover:bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                            <div className="overflow-y-auto flex-1">
                                <AddWorkshopForm
                                    onSubmit={handleAddWorkshop}
                                    onCancel={() => setShowAddForm(false)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Details Modal */}
                {showDetailsModal && selectedWorkshop && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                        <div className="bg-white border-4 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">
                            <div className="p-6 border-b-4 border-black flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
                                <h2 className="text-3xl font-black">📋 Workshop Details</h2>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="text-gray-600 hover:text-black font-black text-3xl hover:bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                            <WorkshopDetails workshop={selectedWorkshop} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Workshops;
