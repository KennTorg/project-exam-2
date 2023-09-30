import React from "react";
import styles from "./UserProfile.module.scss";
import { useUser } from "@/context/UserContext";

/**
 * UserProfile component to display user information.
 *
 * @component
 */

const UserProfile = () => {
  const { user } = useUser();

  return (
    <div className={styles.userProfile}>
      {user && <p className={styles.welcomeText}>Welcome, {user.name}!</p>}
    </div>
  );
};

export default UserProfile;
