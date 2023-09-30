// /utils/api/updateVenue.js
import { API_URL } from "./constants";

async function handleUpdate(updatedData) {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));

    if (!accessToken) {
      console.error("User not authenticated");
      return null;
    }

    const response = await fetch(`${API_URL}/venues/${updatedData.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      return response.json();
    } else {
      console.error("Failed to update venue:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error updating venue:", error);
    return null;
  }
}

export { handleUpdate };
