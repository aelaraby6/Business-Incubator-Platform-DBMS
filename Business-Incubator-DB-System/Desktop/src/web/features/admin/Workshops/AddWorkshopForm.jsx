import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faThumbtack,
    faFileAlt,
    faChalkboardUser,
    faMapPin,
    faCalendarDays,
    faClock,
    faUsers,
    faChartBar,
    faXmark,
    faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

const AddWorkshopForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        mentor: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        capacity: '',
        location: '',
        status: 'scheduled',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim())
            newErrors.description = 'Description is required';
        if (!formData.mentor.trim()) newErrors.mentor = 'Mentor is required';
        if (!formData.startDate) newErrors.startDate = 'Start date is required';
        if (!formData.endDate) newErrors.endDate = 'End date is required';
        if (!formData.startTime) newErrors.startTime = 'Start time is required';
        if (!formData.endTime) newErrors.endTime = 'End time is required';
        if (!formData.capacity || formData.capacity <= 0)
            newErrors.capacity = 'Capacity must be greater than 0';
        if (!formData.location.trim()) newErrors.location = 'Location is required';

        // Validate dates
        if (formData.startDate && formData.endDate) {
            if (new Date(formData.startDate) > new Date(formData.endDate)) {
                newErrors.endDate = 'End date must be after start date';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData);
            setFormData({
                title: '',
                description: '',
                mentor: '',
                startDate: '',
                endDate: '',
                startTime: '',
                endTime: '',
                capacity: '',
                location: '',
                status: 'scheduled',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="h-screen md:h-screen overflow-y-auto bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-5xl md:text-6xl font-black text-black mb-3 flex items-center justify-center gap-3">
                        <FontAwesomeIcon icon={faThumbtack} className="text-blue-600" />
                        Create New Workshop
                    </h2>
                    <p className="text-lg text-gray-700 font-bold">Fill in all details to create a new workshop for your entrepreneurs</p>
                </div>

                <div className="space-y-8">
                    {/* Title */}
                    <div className="bg-white border-4 border-black rounded-3xl p-8 hover:shadow-xl transition-all">
                        <label className="flex items-center text-lg font-black text-black mb-4">
                            <FontAwesomeIcon icon={faThumbtack} className="mr-3 text-blue-600 text-2xl" />
                            Workshop Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Advanced React Patterns"
                            className="w-full px-6 py-4 border-3 border-black bg-blue-50 font-bold
                            placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-2xl text-lg"
                        />
                        {errors.title && (
                            <div className="flex items-center gap-3 mt-3 text-red-700 text-sm font-bold bg-red-200 border-3 border-red-600 p-3 rounded-xl">
                                <FontAwesomeIcon icon={faXmark} className="text-2xl" />
                                {errors.title}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="bg-white border-4 border-black rounded-3xl p-8 hover:shadow-xl transition-all">
                        <label className="flex items-center text-lg font-black text-black mb-4">
                            <FontAwesomeIcon icon={faFileAlt} className="mr-3 text-green-600 text-2xl" />
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the workshop content and objectives..."
                            rows="4"
                            className="w-full px-6 py-4 border-3 border-black bg-green-50 font-bold
                            placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-2xl resize-none text-lg"
                        />
                        {errors.description && (
                            <div className="flex items-center gap-3 mt-3 text-red-700 text-sm font-bold bg-red-200 border-3 border-red-600 p-3 rounded-xl">
                                <FontAwesomeIcon icon={faXmark} className="text-2xl" />
                                {errors.description}
                            </div>
                        )}
                    </div>

                    {/* Mentor */}
                    <div className="bg-white border-4 border-black rounded-3xl p-8 hover:shadow-xl transition-all">
                        <label className="flex items-center text-lg font-black text-black mb-4">
                            <FontAwesomeIcon icon={faChalkboardUser} className="mr-3 text-purple-600 text-2xl" />
                            Assigned Mentor
                        </label>
                        <input
                            type="text"
                            name="mentor"
                            value={formData.mentor}
                            onChange={handleChange}
                            placeholder="e.g., John Doe"
                            className="w-full px-6 py-4 border-3 border-black bg-purple-50 font-bold
                            placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-2xl text-lg"
                        />
                        {errors.mentor && (
                            <div className="flex items-center gap-3 mt-3 text-red-700 text-sm font-bold bg-red-200 border-3 border-red-600 p-3 rounded-xl">
                                <FontAwesomeIcon icon={faXmark} className="text-2xl" />
                                {errors.mentor}
                            </div>
                        )}
                    </div>

                    {/* Location */}
                    <div className="bg-white border-4 border-black rounded-3xl p-8 hover:shadow-xl transition-all">
                        <label className="flex items-center text-lg font-black text-black mb-4">
                            <FontAwesomeIcon icon={faMapPin} className="mr-3 text-red-600 text-2xl" />
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g., Conference Room A / Online"
                            className="w-full px-6 py-4 border-3 border-black bg-red-50 font-bold
                            placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-2xl text-lg"
                        />
                        {errors.location && (
                            <div className="flex items-center gap-3 mt-3 text-red-700 text-sm font-bold bg-red-200 border-3 border-red-600 p-3 rounded-xl">
                                <FontAwesomeIcon icon={faXmark} className="text-2xl" />
                                {errors.location}
                            </div>
                        )}
                    </div>

                    {/* Date Range */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border-4 border-black rounded-3xl p-8 hover:shadow-xl transition-all">
                            <label className="flex items-center text-lg font-black text-black mb-4">
                                <FontAwesomeIcon icon={faCalendarDays} className="mr-3 text-orange-600 text-2xl" />
                                Start Date
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full px-6 py-4 border-3 border-black bg-orange-50 font-bold
                                focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-2xl"
                            />
                            {errors.startDate && (
                                <div className="flex items-center gap-3 mt-3 text-red-700 text-xs font-bold bg-red-200 border-3 border-red-600 p-3 rounded-xl">
                                    <FontAwesomeIcon icon={faXmark} />
                                    {errors.startDate}
                                </div>
                            )}
                        </div>
                        <div className="bg-white border-4 border-black rounded-3xl p-8 hover:shadow-xl transition-all">
                            <label className="flex items-center text-lg font-black text-black mb-4">
                                <FontAwesomeIcon icon={faCalendarDays} className="mr-3 text-orange-600 text-2xl" />
                                End Date
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="w-full px-6 py-4 border-3 border-black bg-orange-50 font-bold
                                focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-2xl"
                            />
                            {errors.endDate && (
                                <div className="flex items-center gap-3 mt-3 text-red-700 text-xs font-bold bg-red-200 border-3 border-red-600 p-3 rounded-xl">
                                    <FontAwesomeIcon icon={faXmark} />
                                    {errors.endDate}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Time Range */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border-4 border-black rounded-3xl p-8 hover:shadow-xl transition-all">
                            <label className="flex items-center text-lg font-black text-black mb-4">
                                <FontAwesomeIcon icon={faClock} className="mr-3 text-cyan-600 text-2xl" />
                                Start Time
                            </label>
                            <input
                                type="time"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                className="w-full px-6 py-4 border-3 border-black bg-cyan-50 font-bold
                                focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-2xl"
                            />
                            {errors.startTime && (
                                <div className="flex items-center gap-3 mt-3 text-red-700 text-xs font-bold bg-red-200 border-3 border-red-600 p-3 rounded-xl">
                                    <FontAwesomeIcon icon={faXmark} />
                                    {errors.startTime}
                                </div>
                            )}
                        </div>
                        <div className="bg-white border-4 border-black rounded-3xl p-8 hover:shadow-xl transition-all">
                            <label className="flex items-center text-lg font-black text-black mb-4">
                                <FontAwesomeIcon icon={faClock} className="mr-3 text-cyan-600 text-2xl" />
                                End Time
                            </label>
                            <input
                                type="time"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                className="w-full px-6 py-4 border-3 border-black bg-cyan-50 font-bold
                                focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-2xl"
                            />
                            {errors.endTime && (
                                <div className="flex items-center gap-3 mt-3 text-red-700 text-xs font-bold bg-red-200 border-3 border-red-600 p-3 rounded-xl">
                                    <FontAwesomeIcon icon={faXmark} />
                                    {errors.endTime}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Capacity and Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border-4 border-black rounded-3xl p-8 hover:shadow-xl transition-all">
                            <label className="flex items-center text-lg font-black text-black mb-4">
                                <FontAwesomeIcon icon={faUsers} className="mr-3 text-indigo-600 text-2xl" />
                                Capacity
                            </label>
                            <input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                placeholder="e.g., 50"
                                min="1"
                                className="w-full px-6 py-4 border-3 border-black bg-indigo-50 font-bold
                                placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-2xl text-lg"
                            />
                            {errors.capacity && (
                                <div className="flex items-center gap-3 mt-3 text-red-700 text-xs font-bold bg-red-200 border-3 border-red-600 p-3 rounded-xl">
                                    <FontAwesomeIcon icon={faXmark} />
                                    {errors.capacity}
                                </div>
                            )}
                        </div>
                        <div className="bg-white border-4 border-black rounded-3xl p-8 hover:shadow-xl transition-all">
                            <label className="flex items-center text-lg font-black text-black mb-4">
                                <FontAwesomeIcon icon={faChartBar} className="mr-3 text-emerald-600 text-2xl" />
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-6 py-4 border-3 border-black bg-emerald-50 font-bold
                                cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-2xl text-lg"
                            >
                                <option value="scheduled">📋 Scheduled</option>
                                <option value="ongoing">⚡ Ongoing</option>
                                <option value="completed">✅ Completed</option>
                            </select>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-4 pt-8 border-t-4 border-black sticky bottom-0 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 -mx-8 px-8 py-6">
                        <button
                            type="submit"
                            className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-green-300 text-black border-4 border-black
                            hover:shadow-2xl hover:-translate-y-2 transition-all font-black text-lg rounded-2xl"
                        >
                            <FontAwesomeIcon icon={faCheckCircle} size="lg" />
                            Create Workshop
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-red-300 text-black border-4 border-black
                            hover:shadow-2xl hover:-translate-y-2 transition-all font-black text-lg rounded-2xl"
                        >
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddWorkshopForm;
