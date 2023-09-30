// Import the necessary dependencies
import { API_URL } from "@/utils/api/constants";

// Define the fetchVenueDetails function
const fetchVenueDetails = async (venueId, includeOwner = false) => {
  try {
    // Define the query parameters
    const queryParams = new URLSearchParams();
    if (includeOwner) {
      queryParams.append("_owner", "true");
    }
    queryParams.append("_bookings", "true"); // Always include bookings by default

    // Send a GET request to fetch venue details
    const response = await fetch(
      `${API_URL}/venues/${venueId}?${queryParams.toString()}`
    );

    // Check if the response is successful (status code 200)
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      // Log an error message for unsuccessful responses
      console.error("Failed to fetch venue details: ", response.statusText);
      return null;
    }
  } catch (error) {
    // Handle any network or other errors
    console.error("An error occurred while fetching venue details: ", error);
    return null;
  }
};

// Export the fetchVenueDetails function for use in other components
export default fetchVenueDetails;
