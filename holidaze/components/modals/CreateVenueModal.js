import React, { useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import { API_URL } from "@/utils/api/constants";
import styles from "@/components/modals/CreateVenueModal.module.scss";

Modal.setAppElement("#__next"); // Set the root app element

const CreateVenueModal = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    media: [],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
    },
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "media") {
      const mediaArray = value.split(",").map((url) => url.trim());
      setFormData({
        ...formData,
        [name]: mediaArray,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

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

  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));

      if (!accessToken) {
        router.push("/login");
        return;
      }

      const response = await fetch(`${API_URL}/venues`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("You've created a venue");
        window.location.reload();
      } else {
        console.error("Failed to create venue:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating venue:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel='Create Venue Modal'
    >
      <div className={styles.createVenue}>
        <h1>Create Venue</h1>
        <form onSubmit={handleSubmit}>
          {/* Add an input field for the media URLs */}
          <input
            type='text'
            name='media'
            value={formData.media}
            onChange={handleInputChange}
            placeholder='Media URLs (comma-separated)'
            required
          />
          {/* Display the media images */}
          <div>
            <h3>Media Images:</h3>
            {formData.media.length > 0 &&
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
          <button type='submit'>Create Venue</button>
        </form>
      </div>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default CreateVenueModal;
