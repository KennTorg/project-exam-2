import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ProfileCard.module.scss";
import Loader from "../Loader";
import { toast } from "react-toastify";

/**
 * ProfileCard component for displaying user profile information.
 *
 * @component
 * @param {Object} userData - User data object.
 * @param {function} onAvatarChange - Function to handle avatar changes.
 */
const ProfileCard = ({ userData, onAvatarChange }) => {
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  /**
   * Handles the submission of a new avatar URL.
   *
   * @param {Object} e - Event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newAvatarUrl) {
      onAvatarChange(newAvatarUrl);
      toast.success("Avatar changed successfully");
      setNewAvatarUrl("");
    } else {
      toast.error("Please provide a valid avatar URL");
    }
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
          <div className={styles.userData}>
            <h2>{userData.name}</h2>
            <p>Email: {userData.email}</p>
            <p>Venue Manager: {userData.venueManager ? "Yes" : "No"}</p>
          </div>

          <div className={styles.changeAvatar}>
            <h3>Change Avatar</h3>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='New Avatar URL'
                value={newAvatarUrl}
                onChange={(e) => setNewAvatarUrl(e.target.value)}
              />
              <button type='submit'>Change Avatar</button>
            </form>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

// Prop type validation
ProfileCard.propTypes = {
  userData: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    venueManager: PropTypes.bool.isRequired,
  }),
  onAvatarChange: PropTypes.func.isRequired,
};

export default ProfileCard;
