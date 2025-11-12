import React from "react";
import axios from "axios";

const AdminList = ({ admins, fetchAdmins, setEditAdmin }) => {
  const URL = "http://localhost:8080/adminservice";
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      fetchAdmins();
    } catch (error) {
      console.error("Error while deleting admin: ", error);
    }
  };
  return (
    <div className="admin-list-container">
      <h2>Admin Records</h2>
      {admins.length === 0 ? (
        <p className="no-data">No admins available!</p>
      ) : (
        <div className="admin-grid">
          {admins.map((admin) => (
            <div key={admin.id} className="admin-card">
              <div className="admin-details">
                <h3>{admin.name}</h3>
                <p>
                  <strong>ID: </strong>
                  {admin.id}
                </p>
                <p>
                  <strong>Email: </strong>
                  {admin.email}
                </p>
                {/* <p>
                  <strong>Password: </strong>
                  {admin.password}
                </p> */}
                <p>
                  <strong>Role: </strong>
                  {admin.role}
                </p>
                <p>
                  <strong>Status: </strong>
                  {admin.status ? "Active" : "Inactive"}
                </p>
                <p>
                  <strong>Phone: </strong>
                  {admin.phone}
                </p>
                <p>
                  <strong>Section: </strong>
                  {admin.assignedSection}
                </p>
              </div>
              <div className="card-buttons">
                <button
                  className="edit-btn"
                  onClick={() => setEditAdmin(admin)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
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
