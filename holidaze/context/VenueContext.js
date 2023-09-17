import { createContext, useContext, useState } from "react";

// Create the context
const VenueContext = createContext();

// Create a custom hook to access the context
export const useVenueContext = () => {
  return useContext(VenueContext);
};

// Create a provider component to wrap your app with the context
export const VenueProvider = ({ children }) => {
  const [selectedVenue, setSelectedVenue] = useState(null);

  return (
    <VenueContext.Provider value={{ selectedVenue, setSelectedVenue }}>
      {children}
    </VenueContext.Provider>
  );
};
