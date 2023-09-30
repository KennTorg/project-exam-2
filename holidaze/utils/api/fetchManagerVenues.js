// Import the necessary dependencies
import { API_URL } from "@/utils/api/constants";

// Define the fetchOwnedVenues function
const fetchOwnedVenues = async (profileName) => {
  try {
    // Get the access token from local storage
    const accessTokenString = localStorage.getItem("accessToken");

    if (!accessTokenString) {
      // Handle the case where there is no access token (e.g., redirect to login)
      return null;
    }

    // Parse the access token string to remove double quotes
    const accessToken = JSON.parse(accessTokenString);

    // Send a GET request to fetch venues owned by the profile
    const response = await fetch(`${API_URL}/profiles/${profileName}/venues`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
      },
    });

    // Check if the response is successful (status code 200)
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // Log an error message for unsuccessful responses
      console.error("Failed to fetch owned venues: ", response.statusText);
      return null;
    }
  } catch (error) {
    // Handle any network or other errors
    console.error("An error occurred while fetching owned venues: ", error);
    return null;
  }
};

// Export the fetchOwnedVenues function for use in other components
export default fetchOwnedVenues;
