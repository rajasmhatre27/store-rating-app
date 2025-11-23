import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios.js";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, role } = response.data;
      login(token);

      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "store_owner") navigate("/owner/dashboard");
      else navigate("/stores");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-2"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          New here?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
