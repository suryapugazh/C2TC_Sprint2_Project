import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminForm from "./components/AdminForm";
import AdminList from "./components/AdminList";
import "./App.css";

const App = () => {
  const URL = "http://localhost:8080/adminservice";
  const [admins, setAdmins] = useState([]);
  const [editAdmin, setEditAdmin] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(URL);
      // console.log(res)
      const data = res.data;
      setAdmins(data);
    } catch (error) {
      console.error("Error while fetching admins: ", error);
    }
  };
  return (
    <div className="App">
      <h1 style={{ textAlign: "center", margin: "10px 0"}}>Admin Management System</h1>
      <AdminForm
        fetchAdmins={fetchAdmins}
        editAdmin={editAdmin}
        setEditAdmin={setEditAdmin}
      />
      <AdminList
        admins={admins}
        fetchAdmins={fetchAdmins}
        setEditAdmin={setEditAdmin}
      />
    </div>
  );
};

export default App;
