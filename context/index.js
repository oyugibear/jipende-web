"use client"

import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for user details
export const UserContext = createContext();

// UserProvider component to wrap your app with
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  // Retrieve user details from local storage when the component mounts
  useEffect(() => {
    if (window.localStorage !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const updateUser = (newUser) => {
    // Update user in the context and local storage
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user details
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const useLogout = () => {
  const { updateUser } = useUser();

  const logout = () => {
    // Clear user details from local storage
    localStorage.removeItem("user");

    // Clear user details from the context state
    updateUser(null);
  };

  return logout;
};
