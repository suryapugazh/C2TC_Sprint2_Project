import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminForm from "./components/AdminForm";
import AdminList from "./components/AdminList";
import { Toaster } from "react-hot-toast";

const App = () => {
  const URL = "http://localhost:8080/adminservice";
  const [admins, setAdmins] = useState([]);
  const [editAdmin, setEditAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await axios.get(URL);
      setAdmins(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 16px",
          },
        }}
      />
      <h1 className="text-2xl font-semibold m-5 text-center tracking-tight">
        Admin Management System
      </h1>
      <AdminForm
        fetchAdmins={fetchAdmins}
        editAdmin={editAdmin}
        setEditAdmin={setEditAdmin}
      />
      <AdminList
        admins={admins}
        loading={loading}
        fetchAdmins={fetchAdmins}
        setEditAdmin={setEditAdmin}
      />
    </div>
  );
};

export default App;
