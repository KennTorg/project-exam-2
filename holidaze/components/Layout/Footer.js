// Footer.js
import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Footer content goes here */}
      &copy; {new Date().getFullYear()} My App
    </footer>
  );
};

export default Footer;
