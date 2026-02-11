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
            iconColor: 'text-blue-600',
        },
        {
            id: 2,
            title: 'Projects',
            value: '54,320',
            change: '',
            icon: FolderKanban,
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600',
        },
        {
            id: 3,
            title: 'Mentors',
            value: '1,852',
            change: '',
            icon: UserCheck,
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600',
        },
        {
            id: 4,
            title: 'Workshops',
            value: '509',
            change: '',
            icon: Calendar,
            bgColor: 'bg-cyan-50',
            iconColor: 'text-cyan-600',
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

    const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

    // Workshops Status
    const workshopsData = [
        { status: 'Completed', count: 285 },
        { status: 'Ongoing', count: 142 },
        { status: 'Scheduled', count: 82 },
    ];

    const WORKSHOP_COLORS = ['#10b981', '#6366f1', '#f59e0b'];

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 h-screen">
            <div className="p-4 md:p-6 lg:p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back! Here's what's happening.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.id}
                                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium mb-1">
                                            {stat.title}
                                        </p>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            {stat.value}
                                        </h3>
                                    </div>
                                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                                        <Icon className={stat.iconColor} size={24} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Charts Section */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Users & Projects Growth */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Users & Projects Growth</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={growthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="month" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="users"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    dot={{ fill: '#6366f1', r: 4 }}
                                    name="Users"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="projects"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    dot={{ fill: '#10b981', r: 4 }}
                                    name="Projects"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* User Growth */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">User Growth (Last 7 Days)</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="day" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Bar dataKey="users" fill="#6366f1" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Mentors Distribution */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Mentors by Category</h2>
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
                                >
                                    {mentorsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Workshops Status */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Workshops Status</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={workshopsData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis type="number" stroke="#6b7280" />
                                <YAxis
                                    dataKey="status"
                                    type="category"
                                    stroke="#6b7280"
                                    width={100}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                                    {workshopsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={WORKSHOP_COLORS[index]} />
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