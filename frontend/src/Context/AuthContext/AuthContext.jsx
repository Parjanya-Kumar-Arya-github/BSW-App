import { createContext, useState, useContext, useEffect } from "react";
import config from "../../config";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Defined states as requested
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  
  const navigate = useNavigate();
  const baseurl = config.baseAPIURL;

  // Derived state
  const isLoggedIn = !!user;

  // fetch logged-in user using cookie auth
  const fetchUser = async () => {
    try {
      setLoading(true);

      // Dev environment dummy login logic
      if (import.meta.env.VITE_ENV === "DEVELOPMENT") {
        await fetch(`${baseurl}/auth/dummyLogin/user`, {
          method: "POST",
          credentials: "include",
        });
      }

      const res = await fetch(`${baseurl}/auth/profile`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setUser(data?.user);
      setAuthError(null);
    } catch (err) {
      console.error("Auth check failed:", err.message);
      setUser(null);
      setAuthError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // run once on app load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");

    if (error) {
      setAuthError(error);
      setLoading(false);
      return;
    }

    fetchUser();
  }, []);

  // logout user
  const logout = async () => {
    try {
      setLoading(true);
      await fetch(`${baseurl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        isLoggedIn,
        fetchUser,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};