// Import the necessary dependencies
import { API_URL } from "@/utils/api/constants";

// Define the fetchVenueDetails function
const fetchVenueDetails = async (venueId) => {
  try {
    // Define the query parameter for including bookings
    const queryParams = new URLSearchParams({ _bookings: false });

    console.log("Fetching URL:", `${API_URL}/venues/${venueId}`);
    // Send a GET request to fetch venue details
    const response = await fetch(
      `${API_URL}/venues/${venueId}?${queryParams.toString()}`
    );

    // Check if the response is successful (status code 200)
    if (response.ok) {
      // Parse the JSON response and return the data
      const data = await response.json();

      // ==================== FILTERS THE BOOKINGS DUNNO IF ITS WORKING PROPERLY... ===========
      // // Ensure that the 'bookings' property exists and is an array
      // if (Array.isArray(data.bookings)) {
      //   // Filter bookings for the specific venueId
      //   const venueBookings = data.bookings.filter(
      //     (booking) => booking.venue && booking.venue.id === venueId
      //   );

      //   // Add the filtered bookings back to the data
      //   data.bookings = venueBookings;
      // } else {
      //   // If 'bookings' is not an array, set it to an empty array
      //   data.bookings = [];
      // }

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
