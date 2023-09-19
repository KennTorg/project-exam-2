// fetchBookingDetails.js

// Import the necessary dependencies
import { API_URL } from "@/utils/api/constants";

// Define the fetchBookingDetails function
const fetchBookingDetails = async (bookingId) => {
  try {
    // // Define the query parameters
    // const queryParams = new URLSearchParams();
    // if (includeOwner) {
    //   queryParams.append("_owner", "true");
    // }
    // queryParams.append("_bookings", "true");

    // Get the access token from localStorage (replace 'your_access_token_key' with the actual key used)
    const accessTokenString = localStorage.getItem("accessToken");

    // Check if the access token is available
    if (!accessTokenString) {
      console.error("Access token not found in localStorage.");
      return null;
    }

    // Parse the access token string to remove double quotes
    const accessToken = JSON.parse(accessTokenString);

    //console.log(accessToken);

    // Send a GET request to fetch booking details with _venue=true query parameter and include the access token in the headers
    const response = await fetch(`${API_URL}/bookings/${bookingId}?_bookings`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Check if the response is successful (status code 200)
    if (response.ok) {
      // Parse the JSON response and return the data
      const data = await response.json();
      return data;
    } else {
      // Log an error message for unsuccessful responses
      console.error("Failed to fetch booking details: ", response.statusText);
      return null;
    }
  } catch (error) {
    // Handle any network or other errors
    console.error("An error occurred while fetching booking details: ", error);
    return null;
  }
};

// Export the fetchBookingDetails function for use in other components
export default fetchBookingDetails;
