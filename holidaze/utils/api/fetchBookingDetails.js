import { API_URL } from "@/utils/api/constants";

// Define the fetchBookingDetails function
const fetchBookingDetails = async (bookingId) => {
  try {
    // Get the access token from localStorage
    const accessTokenString = localStorage.getItem("accessToken");

    if (!accessTokenString) {
      console.error("Access token not found in localStorage.");
      return null;
    }

    // Parse the access token string to remove double quotes
    const accessToken = JSON.parse(accessTokenString);

    //console.log(accessToken);

    const response = await fetch(`${API_URL}/bookings/${bookingId}?_bookings`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch booking details: ", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("An error occurred while fetching booking details: ", error);
    return null;
  }
};

export default fetchBookingDetails;
