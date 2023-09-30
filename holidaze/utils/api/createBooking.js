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

    if (response.ok) {
      // Parse the JSON response and return the data
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to create booking:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("An error occurred while creating booking:", error);
    return null;
  }
};

export default createBooking;
