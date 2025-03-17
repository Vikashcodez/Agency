import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold">Hello Admin</h2>
        <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/add-package")}
        >
          Add Package
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
