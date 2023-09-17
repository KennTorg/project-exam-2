import React, { useState } from "react";
import { API_URL } from "@/utils/api/constants";
import styles from "../CreateVenue/CreateVenue.module.scss";

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
        console.error("User not authenticated");
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
        alert("Venue updated successfully");
        window.location.reload();
      } else {
        console.error("Failed to update venue:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating venue:", error);
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

        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleInputChange}
          placeholder='Venue Name'
          required
        />

        <input
          type='number'
          name='maxGuests'
          value={formData.maxGuests}
          onChange={handleNumberInputChange}
          placeholder='Max Guests'
          required
          min='1'
        />

        <textarea
          name='description'
          value={formData.description}
          onChange={handleInputChange}
          placeholder='Venue Description'
          rows='4'
          required
        />

        <input
          type='number'
          name='price'
          value={formData.price}
          onChange={handleNumberInputChange}
          placeholder='Price'
          required
        />

        <input
          type='text'
          name='address'
          value={formData.location.address}
          onChange={handleLocationInputChange}
          placeholder='Address'
        />

        <input
          type='text'
          name='city'
          value={formData.location.city}
          onChange={handleLocationInputChange}
          placeholder='City'
        />

        <input
          type='text'
          name='zip'
          value={formData.location.zip}
          onChange={handleLocationInputChange}
          placeholder='ZIP Code'
        />

        <input
          type='text'
          name='country'
          value={formData.location.country}
          onChange={handleLocationInputChange}
          placeholder='Country'
        />

        <label>
          <input
            type='checkbox'
            name='wifi'
            checked={formData.meta.wifi}
            onChange={handleCheckboxChange}
          />
          Wi-Fi
        </label>

        <label>
          <input
            type='checkbox'
            name='parking'
            checked={formData.meta.parking}
            onChange={handleCheckboxChange}
          />
          Parking
        </label>

        <label>
          <input
            type='checkbox'
            name='breakfast'
            checked={formData.meta.breakfast}
            onChange={handleCheckboxChange}
          />
          Breakfast
        </label>

        <label>
          <input
            type='checkbox'
            name='pets'
            checked={formData.meta.pets}
            onChange={handleCheckboxChange}
          />
          Pets Allowed
        </label>

        <button type='submit'>Update Venue</button>
      </form>
    </div>
  );
};

export default UpdateVenue;
