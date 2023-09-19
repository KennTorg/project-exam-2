import { API_URL } from "@/utils/api/constants";

export const updateAvatar = async (name, newAvatarUrl) => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));

    const response = await fetch(`${API_URL}/profiles/${name}/media`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: newAvatarUrl }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to update avatar:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("An error occurred while updating avatar:", error);
    return null;
  }
};
