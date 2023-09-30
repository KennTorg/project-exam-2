import React from "react";
import Modal from "react-modal";
import { API_URL } from "@/utils/api/constants";
import styles from "@/components/modals/CreateVenueModal.module.scss";

const UpdateVenueModal = ({
  isOpen,
  onRequestClose,
  venueData,
  handleCheckboxChange,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));

      if (!accessToken) {
        console.error("User not authenticated");
        return;
      }

      if (!venueData) {
        console.error("Venue data is undefined.");
        return;
      }

      const response = await fetch(`${API_URL}/venues/${venueData.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(venueData),
      });

      if (response.ok) {
        alert("Venue updated successfully");
        onRequestClose();
      } else {
        console.error("Failed to update venue:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel='Update Venue Modal'
      //style={customStyles}
    >
      <div className={styles.createVenue}>
        <h1>Update Venue</h1>
        {isOpen && venueData && (
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='media'
              defaultValue={venueData.media}
              placeholder='Media URLs (comma-separated)'
              required
            />
            <div>
              <h3>Media Images:</h3>
              {venueData.media.length > 0 &&
                venueData.media.map((url, index) => (
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
              defaultValue={venueData.name}
              placeholder='Venue Name'
              required
            />

            <input
              type='number'
              name='maxGuests'
              defaultValue={venueData.maxGuests}
              placeholder='Max Guests'
              required
              min='1'
            />

            <textarea
              name='description'
              defaultValue={venueData.description}
              placeholder='Venue Description'
              rows='4'
              required
            />

            <input
              type='number'
              name='price'
              defaultValue={venueData.price}
              placeholder='Price'
              required
            />

            <input
              type='text'
              name='address'
              defaultValue={venueData.location.address}
              placeholder='Address'
            />

            <input
              type='text'
              name='city'
              defaultValue={venueData.location.city}
              placeholder='City'
            />

            <input
              type='text'
              name='zip'
              defaultValue={venueData.location.zip}
              placeholder='ZIP Code'
            />

            <input
              type='text'
              name='country'
              defaultValue={venueData.location.country}
              placeholder='Country'
            />

            <label>
              <input
                type='checkbox'
                name='wifi'
                checked={venueData.meta.wifi}
                onChange={() => handleCheckboxChange("wifi")}
              />
              Wi-Fi
            </label>

            <label>
              <input
                type='checkbox'
                name='parking'
                checked={venueData.meta.parking}
                onChange={() => handleCheckboxChange("parking")}
              />
              Parking
            </label>

            <label>
              <input
                type='checkbox'
                name='breakfast'
                checked={venueData.meta.breakfast}
                onChange={() => handleCheckboxChange("breakfast")}
              />
              Breakfast
            </label>

            <label>
              <input
                type='checkbox'
                name='pets'
                checked={venueData.meta.pets}
                onChange={() => handleCheckboxChange("pets")}
              />
              Pets Allowed
            </label>
            <button type='submit'>Update Venue</button>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default UpdateVenueModal;
