import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check LocalStorage when the app first loads (Refresh handler)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode the token to get user ID and Role
        const decoded = jwtDecode(token);

        // Check if token is expired (optional but recommended)
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          setUser(null);
        } else {
          // Token is valid, set user state
          setUser({ ...decoded, token });
        }
      } catch (error) {
        // If token is garbage/corrupted, clear it
        console.error("Invalid token found", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
    setLoading(false); // App is ready to render
  }, []);

  // Login Function
  const login = (token) => {
    localStorage.setItem("token", token); // Save to storage
    const decoded = jwtDecode(token); // Decode immediately
    setUser({ ...decoded, token }); // Update state
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("token"); // Clear storage
    setUser(null); // Clear state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook for easy access
export const useAuth = () => {
  return useContext(AuthContext);
};
