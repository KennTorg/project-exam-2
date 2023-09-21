import React from "react";
import styles from "./404.module.scss";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.message}>
        Sorry, we could not find the page you were looking for.
      </p>
    </div>
  );
};

export default NotFound;
