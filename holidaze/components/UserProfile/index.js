import React from "react";
import { useUser } from "@/context/UserContext";

const UserProfile = () => {
  const { user } = useUser();

  return <div>{user && <p>Welcome, {user.name}!</p>}</div>;
};

export default UserProfile;
