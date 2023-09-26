// Footer.js
import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <div className={styles.logo_container}>
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
