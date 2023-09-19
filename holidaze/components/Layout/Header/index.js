import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import Logout from "@/components/auth/Logout";

const Header = () => {
  const [user, setUser] = useState(null); // Initialize user state to null

  // Simulate user login or check if user data is available in local storage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.name) {
      setUser({ username: userData.name, venueManager: userData.venueManager }); // Set the user object with their username and venueManager
    }
  }, []);

  return (
    <header className={styles.header}>
      {/* Header content goes here */}
      <Link href='/'>
        <h1 className={styles.logo}>My App</h1>
      </Link>
      {/* Add links to login, register, and profile pages */}
      <nav>
        <Link href='/venues'>Venues</Link>
        <Link href='/login'>Login</Link>
        <Link href='/register'>Register</Link>
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
      <Logout />
    </header>
  );
};

export default Header;
