// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const verifyToken = async () => {
    try {
      const response = await axios.get("/verifyUser", {
        withCredentials: true,
      });

      if (response.data.valid) {
        setUser(response.data.user);
        if (response.data.isAdmin) {
          return true;
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post("/login", credentials, {
        withCredentials: true,
      });

      console.log(response);
      if (response.status === 200) {
        // const { user, token } = result.data;
        // localStorage.setItem("token", token);
        // localStorage.setItem("user", user);
        localStorage.clear();
        const isAdmin = response.data.isAdmin;
        localStorage.setItem("isAdmin", isAdmin);
        localStorage.setItem("isLogedin", true);
        console.log(response.data.isAdmin);
        verifyToken();
        navigate("/");
      } else {
        alert(response.data);
      }

      if (response.data.success) {
        await verifyToken(); // Verify after login
      }
    } catch (error) {
      alert("incorrect email or password");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.get("/logout", { withCredentials: true });
      setUser(null);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
