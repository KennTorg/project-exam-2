import React from "react";
import { useRouter } from "next/router";
import styles from "./Logout.module.scss";
import { useUser } from "@/context/UserContext";

/**
 * Logout component for user sign-out.
 * @component
 */
const Logout = () => {
  const router = useRouter();
  const { setUser } = useUser();

  /**
   * Handles the user's logout.
   */
  const handleLogout = () => {
    // Clear access token from localStorage
    localStorage.removeItem("accessToken");

    // Set the user data in the context to null
    setUser(null);

    // Redirect to the login page or any other desired page
    router.push("/login");
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
