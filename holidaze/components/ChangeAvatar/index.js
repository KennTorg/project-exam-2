// ChangeAvatar.js
import React, { useState } from "react";

const ChangeAvatar = ({ onAvatarChange }) => {
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the onAvatarChange function to update the avatar
    onAvatarChange(newAvatarUrl);

    // Clear the input field
    setNewAvatarUrl("");
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

export default ChangeAvatar;
