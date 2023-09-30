import { API_URL } from "@/utils/api/constants";

const deleteVenue = async (
  venueId,
  setOwnedVenues,
  selectedVenue,
  setSelectedVenue
) => {
  try {
    // Retrieve the token from localStorage
    const accessTokenString = localStorage.getItem("accessToken");

    if (!accessTokenString) {
      console.error("Token not found in localStorage");
      return;
    }

    // Parse the access token string to remove double quotes
    const accessToken = JSON.parse(accessTokenString);

    console.log(accessToken);

    const response = await fetch(`${API_URL}/venues/${venueId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      // Remove the deleted venue from the list
      setOwnedVenues((prevVenues) =>
        prevVenues.filter((venue) => venue.id !== venueId)
      );

      // Clear the selected venue if it's the one that was deleted
      if (selectedVenue.id === venueId) {
        setSelectedVenue({ bookings: [] });
      }
    } else {
      console.error("Failed to delete venue:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting venue:", error);
  }
};

export default deleteVenue;
