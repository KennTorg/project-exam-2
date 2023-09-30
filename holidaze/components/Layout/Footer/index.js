import React from "react";
import { toast } from "react-toastify";
import styles from "./Footer.module.scss";

/**
 * Footer component for the application.
 */
const Footer = () => {
  const handleLogoClick = () => {
    toast.info("Welcome back to Holidaze!", { position: "bottom-right" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <div className={styles.logo_container} onClick={handleLogoClick}>
          <h1>Holidaze</h1>
        </div>
        <div className={styles.copyright_container}>
          &copy; {new Date().getFullYear()} Holidaze | KennTorg
        </div>
      </div>
    </footer>
  );
};

export default Footer;
