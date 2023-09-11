// pages/venues/index.jsx
import React, { useEffect, useState } from "react";
import { API_URL } from "@/utils/api/constants";
import VenuesList from "@/components/VenuesList"; // Import the VenuesList component
import Layout from "@/components/Layout";

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(`${API_URL}/venues`);
        if (response.ok) {
          const data = await response.json();
          setVenues(data);
        } else {
          console.error("Failed to fetch venues:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred while fetching venues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  if (loading) {
    return <p>Loading venues...</p>;
  }

  return (
    <Layout>
      <div>
        <h1>Venues</h1>
        <VenuesList venues={venues} /> {/* Use the VenuesList component */}
      </div>
    </Layout>
  );
};

export default Venues;
