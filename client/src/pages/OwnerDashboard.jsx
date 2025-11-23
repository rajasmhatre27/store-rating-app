import { useEffect, useState } from "react";
import axios from "axios"; // Direct import

const OwnerDashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // --- INTERNAL API HELPER ---
  const getApi = () => {
    const token = localStorage.getItem("token");
    return axios.create({
      baseURL: "http://localhost:5000/api",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = getApi();
        const res = await api.get("/owner/dashboard");
        setData(res.data);
      } catch (err) {
        // Jar user Owner nasel, tar vegla message dakhva
        setError(err.response?.data?.message || "Failed to load dashboard");
      }
    };
    fetchData();
  }, []);

  if (error)
    return (
      <div className="p-8 text-red-600 font-bold text-center">{error}</div>
    );
  if (!data)
    return (
      <div className="p-8 text-center text-gray-500">
        Loading your store data...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Owner Dashboard</h1>
      <h2 className="text-xl text-gray-600 mb-8">
        Store: <span className="font-bold text-blue-600">{data.storeName}</span>
      </h2>

      {/* Average Card */}
      <div className="bg-white p-6 rounded shadow mb-8 max-w-sm border-l-4 border-purple-500">
        <h3 className="text-gray-500 font-bold uppercase text-sm">
          Average Rating
        </h3>
        <p className="text-4xl font-bold text-gray-800">
          {Number(data.averageRating).toFixed(1)}{" "}
          <span className="text-lg text-gray-400">/ 5</span>
        </p>
      </div>

      {/* Ratings Table */}
      <div className="bg-white rounded shadow overflow-hidden max-w-2xl">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h3 className="font-bold text-gray-700">Customer Ratings</h3>
        </div>

        {data.ratings.length === 0 ? (
          <p className="p-6 text-gray-500 text-center">
            No ratings yet. Encourage customers to visit!
          </p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                <th className="px-6 py-3 font-bold">User Name</th>
                <th className="px-6 py-3 font-bold">Rating</th>
              </tr>
            </thead>
            <tbody>
              {data.ratings.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{item.userName}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.rating >= 4
                          ? "bg-green-100 text-green-700"
                          : item.rating >= 3
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.rating} / 5
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
