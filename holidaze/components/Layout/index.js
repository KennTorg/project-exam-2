// Layout.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {children}
        {/* Main content goes here */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
