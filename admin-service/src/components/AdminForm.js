import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
      setStatus(false);
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
        toast.success("Admin updated successfully");
      } else {
        await axios.post(URL, admin);
        toast.success("Admin added successfully");
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
      toast.error("Failed to save admin");
    }
  };

  const fieldStyle =
    "w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-emerald-600 focus:bg-white";

  return (
    <div
      className="max-w-md mx-auto bg-white border border-gray-200 
    rounded-xl p-8 mt-10 shadow-sm"
    >
      <h2 className="text-2xl font-semibold mb-5 text-center tracking-tight">
        {editAdmin ? "Edit Admin" : "Add Admin"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Admin ID"
          required
          disabled={!!editAdmin}
          className={fieldStyle}
        />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Admin Name"
          required
          className={fieldStyle}
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin Email"
          required
          className={fieldStyle}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin Password"
          required
          className={fieldStyle}
        />

        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Admin Role"
          required
          className={fieldStyle}
        />

        <div
          className="flex items-center justify-between border border-gray-300 
        bg-gray-50 rounded-md px-4 py-3"
        >
          <label className="text-gray-700">Status</label>
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            className="w-5 h-5 accent-emerald-600 cursor-pointer"
          />
        </div>

        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Admin Phone"
          className={fieldStyle}
        />

        <input
          type="text"
          value={assignedSection}
          onChange={(e) => setAssignedSection(e.target.value)}
          placeholder="Admin Section"
          className={fieldStyle}
        />

        <button
          type="submit"
          className="w-full py-3 bg-emerald-600 text-white font-semibold 
          rounded-md hover:bg-emerald-700 transition"
        >
          {editAdmin ? "Update Admin" : "Add Admin"}
        </button>
      </form>
    </div>
  );
};

export default AdminForm;
