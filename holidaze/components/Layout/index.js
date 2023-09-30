import React from "react";
import { toast } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.scss";
import PropTypes from "prop-types";

/**
 * Layout component for the application.
 * @param {object} props - The properties for this component.
 * @param {React.ReactNode} props.children - The child components to be displayed in the layout.
 */
const Layout = ({ children }) => {
  const handleLogoClick = () => {
    toast.info("Welcome back to Holidaze!", { position: "bottom-right" });
  };

  return (
    <div className={styles.layout}>
      <Header onLogoClick={handleLogoClick} />
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
      <Footer />
    </div>
  );
};

// PropTypes
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
