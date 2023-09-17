import React, { useEffect, useState } from "react";
import fetchOwnedVenues from "@/utils/api/fetchManagerVenues";
import styles from "./ManageVenues.module.scss";
import UpdateVenue from "../UpdateVenue";
import CreateVenue from "../CreateVenue";
import { handleUpdate } from "@/utils/api/updateVenue";
import { API_URL } from "@/utils/api/constants";
import deleteVenue from "@/utils/api/deleteVenue";

const ManageVenues = () => {
  const [ownedVenues, setOwnedVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState({ bookings: [] });
  const [isCreateFormVisible, setCreateFormVisible] = useState(true);

  const handleVenueClick = async (venue) => {
    try {
      setSelectedVenue(venue);
      setCreateFormVisible(false);

      const response = await fetch(
        `${API_URL}/venues/${venue.id}?_bookings=true`
      );

      if (response.ok) {
        const data = await response.json();
        setSelectedVenue({ ...venue, bookings: data.bookings });
      } else {
        console.error("Failed to fetch bookings:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleCreateFormVisible = () => {
    setCreateFormVisible(true);
    setSelectedVenue({ bookings: [] });
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.name) {
      const profileName = userData.name;

      const fetchVenues = async () => {
        try {
          const response = await fetchOwnedVenues(profileName);

          if (response) {
            setOwnedVenues(response);
          }
        } catch (error) {
          console.error("Error fetching owned venues: ", error);
        }
      };

      fetchVenues();
    }
  }, []);

  const handleDeleteVenue = async (venueId) => {
    deleteVenue(venueId, setOwnedVenues, selectedVenue, setSelectedVenue);
  };

  const defaultImageUrl =
    "https://images.unsplash.com/photo-1565024144485-d0076966fe6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9iaXR0b258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60";

  return (
    <div className={styles.manageVenues}>
      <h1>Manage Your Venues</h1>
      <div className={styles.formContainer}>
        {isCreateFormVisible ? (
          <CreateVenue />
        ) : (
          <UpdateVenue venueData={selectedVenue} onSubmit={handleUpdate} />
        )}
        {selectedVenue && (
          <button onClick={handleCreateFormVisible}>Create Venue</button>
        )}
      </div>
      <div className={styles.venueList}>
        {ownedVenues.map((venue) => (
          <div
            key={venue.id}
            className={styles.venueCard}
            onClick={() => handleVenueClick(venue)}
          >
            <div className={styles.imageContainer}>
              {venue.media.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`${venue.name} - Image ${index + 1}`}
                  className={styles.image}
                  onError={(e) => {
                    e.target.src = defaultImageUrl;
                  }}
                />
              ))}
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.name}>{venue.name}</h2>
              <p className={styles.description}>{venue.description}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  handleDeleteVenue(venue.id);
                }}
                className={styles.deleteButton} // Add your delete button style here
              >
                Delete Venue
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.bookingsContainer}>
        {selectedVenue &&
          selectedVenue.bookings &&
          selectedVenue.bookings.length > 0 && (
            <div className={styles.bookings}>
              <h2>Bookings for {selectedVenue.name}</h2>
              <ul>
                {selectedVenue.bookings.map((booking) => (
                  <li key={booking.id}>
                    Booking ID: {booking.id}, Date: {booking.dateFrom} to{" "}
                    {booking.dateTo}, Guests: {booking.guests}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
};

export default ManageVenues;
