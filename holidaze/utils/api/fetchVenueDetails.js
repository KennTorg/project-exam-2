// Import the necessary dependencies
import { API_URL } from "@/utils/api/constants";

// Define the fetchVenueDetails function
const fetchVenueDetails = async (venueId) => {
  try {
    // Define the query parameter for including bookings
    const queryParams = new URLSearchParams({ _bookings: true });

    console.log(`${API_URL}/venues/${venueId}?_bookings=true`);
    // Send a GET request to fetch venue details
    const response = await fetch(
      `${API_URL}/venues/${venueId}?${queryParams.toString()}`
    );

    // Check if the response is successful (status code 200)
    if (response.ok) {
      const data = await response.json();

      // Filter the booking
      if (Array.isArray(data.bookings)) {
        const venueBookings = data.bookings.filter(
          (booking) => booking.id === venueId
        );

        // Replace the 'bookings' property with filtered bookings
        data.bookings = venueBookings;
      } else {
        data.bookings = [];
      }

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
