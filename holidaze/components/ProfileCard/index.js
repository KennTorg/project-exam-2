import React, { useState } from "react";
import styles from "./ProfileCard.module.scss";

const ProfileCard = ({ userData, onAvatarChange }) => {
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAvatarChange(newAvatarUrl);
    setNewAvatarUrl("");
  };

  return (
    <div className={styles.profileCard}>
      {userData ? (
        <>
          <img
            className={styles.avatar}
            src={userData.avatar}
            alt='User Avatar'
          />
          <h2>{userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>Venue Manager: {userData.venueManager ? "Yes" : "No"}</p>
          <div>
            <h3>Change Avatar</h3>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='New Avatar URL'
                value={newAvatarUrl}
                onChange={(e) => setNewAvatarUrl(e.target.value)}
              />
              <button type='submit'>Update Avatar</button>
            </form>
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ProfileCard;
