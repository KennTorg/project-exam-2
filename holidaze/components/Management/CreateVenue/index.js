import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/utils/api/constants";
import styles from "./CreateVenue.module.scss";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

/**
 * CreateVenue component for adding a new venue.
 */
const CreateVenue = () => {
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

  /**
   * Handles changes in input fields.
   * @param {Event} e - The input field change event.
   */
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

  /**
   * Handles changes in location-related input fields.
   * @param {Event} e - The input field change event.
   */
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

  /**
   * Handles changes in number input fields.
   * @param {Event} e - The input field change event.
   */
  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  /**
   * Handles changes in checkbox input fields.
   * @param {Event} e - The input field change event.
   */
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

  /**
   * Handles form submission, creating a new venue.
   * Displays a toast message on success or error.
   * @param {Event} e - The form submission event.
   */
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
        toast.success("Venue created successfully!", {
          position: "bottom-right",
        });
        window.location.reload();
      } else {
        toast.error("Failed to create venue. Please try again later.", {
          position: "bottom-right",
        });
        console.error("Failed to create venue:", response.statusText);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.", {
        position: "bottom-right",
      });
      console.error("Error creating venue:", error);
    }
  };

  return (
    <div className={styles.createVenue}>
      <h1>Create Venue</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='media'
          value={formData.media}
          onChange={handleInputChange}
          placeholder='Media URLs (comma-separated)'
          required
        />
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
  );
};

// PropTypes
CreateVenue.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    media: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
    maxGuests: PropTypes.number,
    rating: PropTypes.number,
    meta: PropTypes.shape({
      wifi: PropTypes.bool,
      parking: PropTypes.bool,
      breakfast: PropTypes.bool,
      pets: PropTypes.bool,
    }),
    location: PropTypes.shape({
      address: PropTypes.string,
      city: PropTypes.string,
      zip: PropTypes.string,
      country: PropTypes.string,
      continent: PropTypes.string,
    }),
  }),
};

export default CreateVenue;
