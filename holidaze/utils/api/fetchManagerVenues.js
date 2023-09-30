import { API_URL } from "@/utils/api/constants";

// Define the fetchOwnedVenues function
const fetchOwnedVenues = async (profileName) => {
  try {
    // Get the access token from local storage
    const accessTokenString = localStorage.getItem("accessToken");

    if (!accessTokenString) {
      return null;
    }

    const accessToken = JSON.parse(accessTokenString);

    const response = await fetch(`${API_URL}/profiles/${profileName}/venues`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch owned venues: ", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("An error occurred while fetching owned venues: ", error);
    return null;
  }
};

export default fetchOwnedVenues;
