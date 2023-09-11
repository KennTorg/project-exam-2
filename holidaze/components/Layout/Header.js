import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link
import styles from "./Header.module.scss";
import Logout from "../auth/Logout";

const Header = () => {
  const [user, setUser] = useState(null); // Initialize user state to null

  // Simulate user login or check if user data is available in local storage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.name) {
      setUser({ username: userData.name }); // Set the user object with their username
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
          <Link href='/profiles/[name]' as={`/profiles/${user.username}`}>
            Profile
          </Link>
        ) : (
          <Link href='/profiles'>Profile</Link>
        )}
      </nav>
      <Logout />
    </header>
  );
};

export default Header;
