import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

/**
 * ChangeAvatar component allows users to update their avatar.
 * @param {Object} props - Component props.
 * @param {function} props.onAvatarChange - Function to update the avatar.
 */
const ChangeAvatar = ({ onAvatarChange }) => {
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  /**
   * Handles the form submission to update the avatar.
   * @param {Event} e - The form submit event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the onAvatarChange function to update the avatar
    onAvatarChange(newAvatarUrl);

    // Clear the input field
    setNewAvatarUrl("");

    // Display a success message
    toast.success("Avatar updated successfully", { position: "top-right" });
  };

  return (
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
  );
};

ChangeAvatar.propTypes = {
  onAvatarChange: PropTypes.func.isRequired,
};

export default ChangeAvatar;
