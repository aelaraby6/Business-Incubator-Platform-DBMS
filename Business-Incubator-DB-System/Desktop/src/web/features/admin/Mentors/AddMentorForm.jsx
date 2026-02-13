import React, { useState } from 'react';
import { 
    X, 
    Save, 
    User, 
    Mail, 
    Phone, 
    Briefcase, 
    Activity, 
    Layers, 
    GraduationCap 
} from 'lucide-react';

const AddMentorForm = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '', 
        email: '', 
        expertise: '', 
        phone: '', 
        status: 'active',
        assignedProject: '', 
        assignedWorkshop: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await window.electron.invoke('mentors:add', formData);
            onSuccess();
        } catch (error) { console.error("Error adding mentor:", error); }
    };

    return (
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 overflow-y-auto bg-gray-50/50">
                
                {/* Basic Info Section */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Personal Information</h3>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                required 
                                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium text-gray-700 bg-white"
                                value={formData.name} 
                                onChange={e => setFormData({...formData, name: e.target.value})} 
                                placeholder="Dr. Ahmed Ali" 
                            />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    required 
                                    type="email" 
                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium text-gray-700 bg-white"
                                    value={formData.email} 
                                    onChange={e => setFormData({...formData, email: e.target.value})} 
                                    placeholder="email@example.com" 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium text-gray-700 bg-white"
                                    value={formData.phone} 
                                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                                    placeholder="+20 1xxxxxxxxx" 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Professional Info Section */}
                <div className="space-y-4 pt-2">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Professional Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Expertise Area</label>
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <select 
                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium text-gray-700 bg-white cursor-pointer appearance-none"
                                    value={formData.expertise} 
                                    onChange={e => setFormData({...formData, expertise: e.target.value})}
                                >
                                    <option value="">Select Field...</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Business">Business</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Design">Design</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Account Status</label>
                            <div className="relative">
                                <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <select 
                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium text-gray-700 bg-white cursor-pointer appearance-none"
                                    value={formData.status} 
                                    onChange={e => setFormData({...formData, status: e.target.value})}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assignment Section */}
                <div className="pt-6 border-t border-dashed border-gray-200">
                    <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                        <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Layers size={16}/> Quick Assignment <span className="text-indigo-400 text-xs normal-case font-normal">(Optional)</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" size={18} />
                                <select 
                                    className="w-full pl-11 pr-4 py-3 border border-indigo-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium text-gray-700 bg-white cursor-pointer appearance-none"
                                    value={formData.assignedProject} 
                                    onChange={e => setFormData({...formData, assignedProject: e.target.value})}
                                >
                                    <option value="">Assign to Project...</option>
                                    <option value="1">Pharmacy App</option> 
                                    <option value="2">E-Commerce</option>
                                </select>
                            </div>
                            <div className="relative">
                                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" size={18} />
                                <select 
                                    className="w-full pl-11 pr-4 py-3 border border-indigo-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium text-gray-700 bg-white cursor-pointer appearance-none"
                                    value={formData.assignedWorkshop} 
                                    onChange={e => setFormData({...formData, assignedWorkshop: e.target.value})}
                                >
                                    <option value="">Assign to Workshop...</option>
                                    <option value="1">React Basics</option>
                                    <option value="2">Agile Scrum</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* Footer / Actions */}
            <div className="p-6 border-t border-gray-100 bg-white">
                <button 
                    onClick={handleSubmit}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                    <Save size={20} /> 
                    Create Mentor Profile
                </button>
            </div>
        </div>
    );
};

export default AddMentorForm;