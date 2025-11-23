import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  // 1. Simple State Objects
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Form State
  const [newStore, setNewStore] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [message, setMessage] = useState("");

  // --- API HELPER ---
  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  // 2. Load Data
  const loadData = async () => {
    try {
      const statsRes = await api.get("/admin/dashboard");
      const usersRes = await api.get("/admin/users");
      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.log("Error loading data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 3. Add Store
  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/add-store", newStore);
      setMessage("✅ Store Added!");
      setNewStore({ name: "", email: "", address: "" }); // Clear form
      loadData(); // Refresh stats
    } catch (error) {
      setMessage("❌ Error adding store");
    }
  };

  // 4. Simple Filter (Search by Name or Email)
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <Link to="/change-password">
          <button className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-600">
            Change Password
          </button>
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
          <h3 className="text-gray-500 font-bold">Total Users</h3>
          <p className="text-4xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded shadow border-l-4 border-green-500">
          <h3 className="text-gray-500 font-bold">Total Stores</h3>
          <p className="text-4xl font-bold">{stats.totalStores}</p>
        </div>
        <div className="bg-white p-6 rounded shadow border-l-4 border-yellow-500">
          <h3 className="text-gray-500 font-bold">Total Ratings</h3>
          <p className="text-4xl font-bold">{stats.totalRatings}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ADD STORE FORM */}
        <div className="bg-white p-6 rounded shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Add Store</h2>
          {message && <p className="mb-4 font-bold text-center">{message}</p>}
          <form onSubmit={handleAddStore} className="flex flex-col gap-4">
            <input
              className="p-2 border rounded"
              placeholder="Store Name"
              required
              value={newStore.name}
              onChange={(e) =>
                setNewStore({ ...newStore, name: e.target.value })
              }
            />
            <input
              className="p-2 border rounded"
              placeholder="Email"
              required
              type="email"
              value={newStore.email}
              onChange={(e) =>
                setNewStore({ ...newStore, email: e.target.value })
              }
            />
            <textarea
              className="p-2 border rounded"
              placeholder="Address"
              required
              rows="3"
              value={newStore.address}
              onChange={(e) =>
                setNewStore({ ...newStore, address: e.target.value })
              }
            />
            <button className="bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700">
              Create Store
            </button>
          </form>
        </div>

        {/* USER LIST */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">All Users</h2>
          <input
            className="p-2 border rounded w-full mb-4"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="overflow-y-auto max-h-96">
            <table className="w-full text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{user.name}</td>
                    <td className="p-2 text-sm text-gray-600">{user.email}</td>
                    <td className="p-2 uppercase text-xs font-bold text-blue-600">
                      {user.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
