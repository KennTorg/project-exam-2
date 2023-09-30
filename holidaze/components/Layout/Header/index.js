import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import Logout from "@/components/auth/Logout";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

/**
 * Header component for the application.
 */
const Header = () => {
  const [user, setUser] = useState(null);

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

  return (
    <header className={styles.header}>
      <>
        <div className={styles.headerLogo}>
          <Link href='/'>
            <h1>Holidaze</h1>
          </Link>
        </div>

        <nav>
          <Link href='/venues'>Venues</Link>

          {user ? (
            <>
              <Link href='/profiles/[name]' as={`/profiles/${user.username}`}>
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
      </>
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
