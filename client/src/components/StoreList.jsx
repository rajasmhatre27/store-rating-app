import { useEffect, useState } from "react";
import axios from "axios"; // Direct library usage
import { Link } from "react-router-dom";

const StoreList = () => {
  const [stores, setStores] = useState([]);

  // --- 1. CONNECTION CONFIG ---
  // Get token directly from browser storage
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // --- 2. FETCH DATA ---
  const fetchStores = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stores", config);
      setStores(res.data);
    } catch (error) {
      console.log("Error loading stores");
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // --- 3. SUBMIT RATING ---
  const handleRate = async (e, storeId) => {
    e.preventDefault(); // Stop page refresh
    const rating = e.target.rating.value; // Get dropdown value

    try {
      await axios.post(
        `http://localhost:5000/api/stores/${storeId}/rate`,
        { rating },
        config
      );
      alert("✅ Rated Successfully!");
      fetchStores(); // Refresh list
    } catch (error) {
      alert("❌ Failed. Try again.");
    }
  };

  // --- 4. SIMPLE LOGOUT ---
  const handleLogout = () => {
    localStorage.removeItem("token"); // Delete token
    window.location.href = "/login"; // Force jump to Login page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold">Store List</h1>
        <div className="space-x-4">
          <Link to="/change-password">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Change Pass
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* STORE CARDS GRID */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {stores.map((store) => (
          <div key={store.id} className="bg-white p-6 rounded shadow">
            {/* Store Info */}
            <h2 className="text-xl font-bold">{store.name}</h2>
            <p className="text-gray-600 mb-4">{store.address}</p>

            {/* Rating Info */}
            <div className="flex justify-between font-bold text-sm mb-4 bg-gray-50 p-2 rounded">
              <span>
                Avg: {store.rating ? Number(store.rating).toFixed(1) : "0"}
              </span>
              <span className="text-green-600">
                You: {store.myRating || "-"}
              </span>
            </div>

            {/* Rating Form */}
            <form
              onSubmit={(e) => handleRate(e, store.id)}
              className="flex gap-2"
            >
              <select
                name="rating"
                className="border p-2 rounded w-full"
                defaultValue="5"
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 rounded font-bold"
              >
                Go
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
