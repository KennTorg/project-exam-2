import React, { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/utils/api/constants";
import ProfileCard from "@/components/ProfileCard";
import Layout from "@/components/Layout";
import UpcomingBookings from "@/components/UpcomingBooking";

const UserProfile = () => {
  const router = useRouter();
  const { name } = router.query;
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfileData = async () => {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));

      if (!accessToken) {
        router.push("/login");
        return;
      }

      const response = await fetch(`${API_URL}/profiles/${name}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
      } else {
        console.error("Failed to fetch user data:", response.statusText);
      }
    };

    if (name) {
      fetchUserProfileData();
    }
  }, [name]);

  const handleAvatarChange = async (newAvatarUrl) => {
    // Logic to update the user's avatar
    // Call the API function to update the avatar here

    // Once the avatar is updated, you can update the user profile state
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      avatar: newAvatarUrl,
    }));
  };

  return (
    <Layout>
      <>
        <div>
          {userProfile ? (
            <ProfileCard
              userData={userProfile}
              onAvatarChange={handleAvatarChange}
            />
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
        <div>
          <UpcomingBookings customerId={name} />
        </div>
      </>
    </Layout>
  );
};

export default UserProfile;
