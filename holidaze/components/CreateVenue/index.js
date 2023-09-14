import React, { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/utils/api/constants";
import styles from "./CreateVenue.module.scss";

const CreateVenue = () => {
  // Initialize state to store form data
  const [formData, setFormData] = useState({
    image: "",
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

  // Handle input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      location: {
        ...formData.location,
        [name]: value,
      },
    });
  };

  // Handle number input fields
  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    // Ensure that the value is a valid number
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

  // Handle form submission
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
        // Venue created successfully, you can redirect to the venue details page or a confirmation page
        router.push("/venues");
      } else {
        console.error("Failed to create venue:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating venue:", error);
    }
  };
  console.log(formData);
  return (
    <div className={styles.createVenue}>
      <h1>Create Venue</h1>
      <form onSubmit={handleSubmit}>
        {/* Add an input field for the image */}
        <input
          type='text'
          name='image'
          value={formData.image}
          onChange={handleInputChange}
          placeholder='Image URL'
          required
        />
        {/* Display the image if a URL is provided */}
        {formData.image && (
          <img src={formData.image} alt='Venue' className={styles.venueImage} />
        )}

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
          onChange={handleInputChange}
          placeholder='Address'
        />

        <input
          type='text'
          name='city'
          value={formData.location.city}
          onChange={handleInputChange}
          placeholder='City'
        />

        <input
          type='text'
          name='zip'
          value={formData.location.zip}
          onChange={handleInputChange}
          placeholder='ZIP Code'
        />

        <input
          type='text'
          name='country'
          value={formData.location.country}
          onChange={handleInputChange}
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
  );
};

export default CreateVenue;
