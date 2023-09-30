import { API_URL } from "@/utils/api/constants";

// Define the fetchVenueDetails function
const fetchVenueDetails = async (venueId, includeOwner = false) => {
  try {
    // Define the query parameters
    const queryParams = new URLSearchParams();
    if (includeOwner) {
      queryParams.append("_owner", "true");
    }
    queryParams.append("_bookings", "true");

    // Send a GET request to fetch venue details
    const response = await fetch(
      `${API_URL}/venues/${venueId}?${queryParams.toString()}`
    );

    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      console.error("Failed to fetch venue details: ", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("An error occurred while fetching venue details: ", error);
    return null;
  }
};

export default fetchVenueDetails;
