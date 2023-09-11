import React from "react";
import { useUser } from "@/context/UserContext";

const UserProfile = () => {
  const { user } = useUser();

  return (
    <div>
      {user ? <p>Welcome, {user.name}!</p> : <p>You are not logged in.</p>}
    </div>
  );
};

export default UserProfile;
