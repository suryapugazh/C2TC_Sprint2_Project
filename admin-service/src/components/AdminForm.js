import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminForm = ({ fetchAdmins, editAdmin, setEditAdmin }) => {
  const URL = "http://localhost:8080/adminservice";
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState(false);
  const [phone, setPhone] = useState("");
  const [assignedSection, setAssignedSection] = useState("");

  useEffect(() => {
    if (editAdmin) {
      setId(editAdmin.id);
      setName(editAdmin.name);
      setEmail(editAdmin.email);
      setPassword(editAdmin.password);
      setRole(editAdmin.role);
      setStatus(editAdmin.status);
      setPhone(editAdmin.phone);
      setAssignedSection(editAdmin.assignedSection);
    } else {
      setId("");
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setStatus("");
      setPhone("");
      setAssignedSection("");
    }
  }, [editAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const admin = {
      id,
      name,
      email,
      password,
      role,
      status,
      phone,
      assignedSection,
    };

    try {
      if (editAdmin) {
        await axios.put(`${URL}/${id}`, admin);
      } else {
        await axios.post(URL, admin);
      }
      fetchAdmins();
      setEditAdmin(null);
      setId("");
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setStatus(false);
      setPhone("");
      setAssignedSection("");
    } catch (error) {
      console.log("Error while saving admin: ", error);
    }
  };

  return (
    <div className="form-container">
      <h2>{editAdmin ? "Edit Admin" : "Add Admin"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Admin ID"
          required
          disabled={!!editAdmin}
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Admin Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin Password"
          required
        />
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Admin Role"
          required
        />
        <div className="checkbox-group">
        <label>Status</label>
        <input
          type="checkbox"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
        />
        </div>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Admin Phone"
        />
        <input
          type="text"
          value={assignedSection}
          onChange={(e) => setAssignedSection(e.target.value)}
          placeholder="Admin Section"
        />
        <button type="submit">
          {editAdmin ? "Update Admin" : "Add Admin"}
        </button>
      </form>
    </div>
  );
};

export default AdminForm;
