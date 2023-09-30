import React, { useContext, useState } from "react";

// Create a UserContext
const UserContext = React.createContext();

// Export a UserProvider component
export function UserProvider({ children }) {
  // Your user state and functions go here
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Create a custom hook for using the user context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
