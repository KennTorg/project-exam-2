import React from "react";
import { useRouter } from "next/router";
import styles from "./Logout.module.scss";
import { useUser } from "@/context/UserContext";

const Logout = () => {
  const router = useRouter();
  const { setUser } = useUser(); // Access the setUser function from the context

  const handleLogout = () => {
    // Clear access token from localStorage
    localStorage.removeItem("accessToken");

    // Clear userData from local storage
    //localStorage.removeItem("userData");

    // Set the user data in the context to null
    setUser(null);

    // Redirect to the login page or any other desired page
    router.push("/login");
  };

  return (
    <button className={styles.button} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
