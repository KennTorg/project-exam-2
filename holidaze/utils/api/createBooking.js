// Import the necessary dependencies
import { API_URL } from "@/utils/api/constants";

// Define the createBooking function
const createBooking = async (bookingData) => {
  try {
    // Send a POST request to create a booking
    const response = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    // Check if the response is successful (status code 201)
    if (response.ok) {
      // Parse the JSON response and return the data
      const data = await response.json();
      return data;
    } else {
      // Log an error message for unsuccessful responses
      console.error("Failed to create booking:", response.statusText);
      return null;
    }
  } catch (error) {
    // Handle any network or other errors
    console.error("An error occurred while creating booking:", error);
    return null;
  }
};

// Export the createBooking function for use in other components
export default createBooking;
