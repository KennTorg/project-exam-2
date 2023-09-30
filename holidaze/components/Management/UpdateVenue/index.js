import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/utils/api/constants";
import styles from "../CreateVenue/CreateVenue.module.scss";

/**
 * Component for updating venue details.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.venueData - Data for the venue to be updated.
 * @param {function} props.onSubmit - Function to handle the form submission.
 */
const UpdateVenue = ({ venueData, onSubmit }) => {
  // Initialize state to store form data
  const [formData, setFormData] = useState(venueData);

  // Handle input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle location input fields
  const handleLocationInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [name]: value,
      },
    });
  };

  // Handle number input fields
  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  // Handle checkboxes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      meta: {
        ...formData.meta,
        [name]: checked,
      },
    });
  };

  // Handle media input field as an array
  const handleMediaInputChange = (e) => {
    const { name, value } = e.target;

    // Split the input value into an array of media URLs
    const mediaArray = value.split(",").map((url) => url.trim());
    setFormData({
      ...formData,
      [name]: mediaArray,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));

      if (!accessToken) {
        toast.error("User not authenticated");
        return;
      }

      const response = await fetch(`${API_URL}/venues/${formData.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Venue updated successfully");
        // Call the onSubmit function if provided
        if (onSubmit) {
          onSubmit();
        }
      } else {
        toast.error("Failed to update venue: " + response.statusText);
      }
    } catch (error) {
      toast.error("Error updating venue: " + error);
    }
  };

  return (
    <div className={styles.createVenue}>
      <h1>Update Venue</h1>
      <form onSubmit={handleSubmit}>
        {/* Add an input field for the media URLs */}
        {formData.media && (
          <input
            type='text'
            name='media'
            value={formData.media.join(", ")}
            onChange={handleMediaInputChange}
            placeholder='Media URLs (comma-separated)'
            required
          />
        )}
        {/* Display the media images */}
        <div>
          <h3>Media Images:</h3>
          {formData.media &&
            formData.media.length > 0 &&
            formData.media.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Image ${index + 1}`}
                className={styles.venueImage}
              />
            ))}
        </div>

        {/* Rest of the form input fields... */}

        <button type='submit'>Update Venue</button>
      </form>
    </div>
  );
};

// Prop types for the component
UpdateVenue.propTypes = {
  venueData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

export default UpdateVenue;
