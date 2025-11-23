import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.name.length < 20) {
      setError("Name must be at least 20 characters long.");
      return;
    }
    try {
      await api.post("/auth/signup", formData);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Signup failed";
      setError(msg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md my-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-center">
            Signup successful! Redirecting...
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Full Name (Min 20 chars)"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Password"
            required
          />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Address"
            rows="2"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 mt-2"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Signup;
