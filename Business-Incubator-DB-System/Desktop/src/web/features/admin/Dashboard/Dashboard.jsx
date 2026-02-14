import React from 'react';
import { Users, FolderKanban, UserCheck, Calendar } from 'lucide-react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
    const stats = [
        {
            id: 1,
            title: 'Total Users',
            value: '12,428',
            change: '',
            icon: Users,
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-900',
        },
        {
            id: 2,
            title: 'Projects',
            value: '54,320',
            change: '',
            icon: FolderKanban,
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-900',
        },
        {
            id: 3,
            title: 'Mentors',
            value: '1,852',
            change: '',
            icon: UserCheck,
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-900',
        },
        {
            id: 4,
            title: 'Workshops',
            value: '509',
            change: '',
            icon: Calendar,
            bgColor: 'bg-gray-100',
            iconColor: 'text-gray-700',
        },
    ];

    // Users & Projects Growth Over Time
    const growthData = [
        { month: 'Jan', users: 8000, projects: 30000 },
        { month: 'Feb', users: 8500, projects: 35000 },
        { month: 'Mar', users: 9200, projects: 38000 },
        { month: 'Apr', users: 9800, projects: 42000 },
        { month: 'May', users: 10500, projects: 45000 },
        { month: 'Jun', users: 11200, projects: 48000 },
        { month: 'Jul', users: 11800, projects: 50000 },
        { month: 'Aug', users: 12428, projects: 54320 },
    ];

    // User Growth 
    const userGrowthData = [
        { day: 'Day 1', users: 145 },
        { day: 'Day 2', users: 178 },
        { day: 'Day 3', users: 132 },
        { day: 'Day 4', users: 98 },
        { day: 'Day 5', users: 156 },
        { day: 'Day 6', users: 165 },
        { day: 'Day 7', users: 189 },
    ];

    // Mentors Distribution by Category
    const mentorsData = [
        { name: 'Technology', value: 650 },
        { name: 'Business', value: 480 },
        { name: 'Design', value: 390 },
        { name: 'Marketing', value: 332 },
    ];

    const COLORS = ['#1e3a8a', '#1e40af', '#3b82f6', '#60a5fa'];

    // Workshops Status
    const workshopsData = [
        { status: 'Completed', count: 285 },
        { status: 'Ongoing', count: 142 },
        { status: 'Scheduled', count: 82 },
    ];

    const WORKSHOP_COLORS = ['#1e3a8a', '#3b82f6', '#6b7280'];

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 h-screen">
            <div className="p-4 md:p-6 lg:p-8">
                {/* Header */}
                <div className="bg-white border-b-4 border-blue-900 mb-8 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-6">
                    <h1 className="text-4xl font-black uppercase text-blue-950">Dashboard</h1>
                    <p className="text-gray-600 mt-2 font-medium">Welcome back! Here's what's happening</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.id}
                                className={`${stat.id === 4 ? 'bg-gray-100 border-gray-600' : 'bg-blue-50 border-blue-900'} border-4 p-6 shadow-[4px_4px_0_0_${stat.id === 4 ? '#4b5563' : '#1e3a8a'}]`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`${stat.bgColor} p-3 border-2 ${stat.id === 4 ? 'border-gray-700' : 'border-blue-950'}`}>
                                        <Icon className={stat.iconColor} size={24} strokeWidth={2.5} />
                                    </div>
                                </div>
                                <p className="text-sm font-bold uppercase text-gray-600 mb-2">
                                    {stat.title}
                                </p>
                                <h3 className="text-4xl font-black text-blue-950">
                                    {stat.value}
                                </h3>
                            </div>
                        );
                    })}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Users & Projects Growth */}
                    <div className="lg:col-span-2 bg-white border-4 border-gray-900 p-6 shadow-[4px_4px_0_0_#111827]">
                        <h2 className="text-xl font-black uppercase text-blue-950 mb-4">Users & Projects Growth</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={growthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="month" stroke="#6b7280" style={{ fontWeight: 'bold' }} />
                                <YAxis stroke="#6b7280" style={{ fontWeight: 'bold' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '4px solid #111827',
                                        borderRadius: '0',
                                        fontWeight: 'bold',
                                    }}
                                />
                                <Legend wrapperStyle={{ fontWeight: 'bold' }} />
                                <Line
                                    type="monotone"
                                    dataKey="users"
                                    stroke="#1e3a8a"
                                    strokeWidth={4}
                                    dot={{ fill: '#1e3a8a', r: 5, strokeWidth: 2, stroke: '#fff' }}
                                    name="Users"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="projects"
                                    stroke="#3b82f6"
                                    strokeWidth={4}
                                    dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                                    name="Projects"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* User Growth */}
                    <div className="bg-white border-4 border-gray-900 p-6 shadow-[4px_4px_0_0_#111827]">
                        <h2 className="text-xl font-black uppercase text-blue-950 mb-4">User Growth (Last 7 Days)</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="day" stroke="#6b7280" style={{ fontWeight: 'bold' }} />
                                <YAxis stroke="#6b7280" style={{ fontWeight: 'bold' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '4px solid #111827',
                                        borderRadius: '0',
                                        fontWeight: 'bold',
                                    }}
                                />
                                <Bar dataKey="users" fill="#1e3a8a" radius={[0, 0, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Mentors Distribution */}
                    <div className="bg-white border-4 border-gray-900 p-6 shadow-[4px_4px_0_0_#111827]">
                        <h2 className="text-xl font-black uppercase text-blue-950 mb-4">Mentors by Category</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={mentorsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="#111827"
                                    strokeWidth={3}
                                >
                                    {mentorsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '4px solid #111827',
                                        borderRadius: '0',
                                        fontWeight: 'bold',
                                    }}
                                />
                                <Legend wrapperStyle={{ fontWeight: 'bold' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Workshops Status */}
                    <div className="lg:col-span-2 bg-white border-4 border-gray-900 p-6 shadow-[4px_4px_0_0_#111827]">
                        <h2 className="text-xl font-black uppercase text-blue-950 mb-4">Workshops Status</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={workshopsData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis type="number" stroke="#6b7280" style={{ fontWeight: 'bold' }} />
                                <YAxis
                                    dataKey="status"
                                    type="category"
                                    stroke="#6b7280"
                                    width={100}
                                    style={{ fontWeight: 'bold' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '4px solid #111827',
                                        borderRadius: '0',
                                        fontWeight: 'bold',
                                    }}
                                />
                                <Bar dataKey="count" radius={[0, 0, 0, 0]}>
                                    {workshopsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={WORKSHOP_COLORS[index]} stroke="#111827" strokeWidth={2} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;