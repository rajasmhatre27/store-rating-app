import { useState } from "react";
import axios from "axios"; // Direct import to avoid path errors

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      // Get token directly from storage
      const token = localStorage.getItem("token");

      // Send request with inline config (Direct URL + Headers)
      await axios.put("http://localhost:5000/api/auth/password", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Password updated successfully");
      setFormData({ oldPassword: "", newPassword: "" });
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Change Password
        </h2>

        {message && (
          <div
            className={`p-3 rounded mb-4 text-center ${
              isError
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
