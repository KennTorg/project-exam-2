import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import the useRouter hook
import styles from "./Header.module.scss";
import Logout from "@/components/auth/Logout";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

/**
 * Header component for the application.
 */
const Header = () => {
  const [user, setUser] = useState(null);
  const router = useRouter(); // Initialize the useRouter

  /**
   * Simulate user login or check if user data is available in local storage.
   * Set user object with their username and venueManager.
   */
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.name) {
      setUser({
        username: userData.name,
        venueManager: userData.venueManager,
      });
    }
  }, []);

  const handleLoginClick = () => {
    toast.info("Welcome to Holidaze! Please log in.", {
      position: "bottom-right",
    });
  };

  const handleProfileClick = () => {
    // Check if the user is not logged in and route to the login page
    if (!user) {
      router.push("/login");
    }
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.headerLogo}>
          <Link href='/'>
            <h1>Holidaze</h1>
          </Link>
        </div>

        <nav>
          <Link href='/venues'>Venues</Link>

          {user ? (
            <>
              <Link href='/profiles/[name]' as={`/profiles/${user.username}`} onClick={handleProfileClick}>
                Profile
              </Link>

              {user.venueManager && (
                <Link href='/venueManagement'>Venue Management</Link>
              )}
            </>
          ) : (
            <Link href='/profiles'>Profile</Link>
          )}
        </nav>
        <div>
          {user ? (
            <Logout />
          ) : (
            <Link
              href='/login'
              className={styles.login_btn}
              onClick={handleLoginClick}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

// PropTypes
Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    venueManager: PropTypes.bool,
  }),
};

export default Header;
