import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminList = ({ admins, loading, fetchAdmins, setEditAdmin }) => {
  const URL = "http://localhost:8080/adminservice";

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      fetchAdmins();
      toast.success("Admin deleted successfully");
    } catch (error) {
      console.error("Error while deleting admin: ", error);
      toast.error("Failed to delete admin");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Admin Records</h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
            >
              <div className="h-5 w-32 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 w-28 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 w-40 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 w-36 bg-gray-200 rounded mb-3"></div>
              <div className="h-10 w-full bg-gray-300 rounded mt-4"></div>
            </div>
          ))}
        </div>
      ) : admins.length === 0 ? (
        <p className="text-center text-gray-400 mt-6">No admins available!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {admin.name}
              </h3>
              <p className="text-sm text-gray-600">
                <strong>ID:</strong> {admin.id}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {admin.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Role:</strong> {admin.role}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong> {admin.status ? "Active" : "Inactive"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Phone:</strong> {admin.phone}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Section:</strong> {admin.assignedSection}
              </p>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm"
                  onClick={() => setEditAdmin(admin)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
                  onClick={() => handleDelete(admin.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminList;
