import Dashboard from "./Dashboard/Dashboard";
import Sidebar from "./Sidebar";


const Admin = () => {
  
  return (
   <>
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <Dashboard />
    </div>
 
   </>
  );
};

export default Admin;