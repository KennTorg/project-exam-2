import React, { useEffect, useState } from "react";
import fetchOwnedVenues from "@/utils/api/fetchManagerVenues";
import styles from "./ManageVenues.module.scss";
import deleteVenue from "@/utils/api/deleteVenue";
import CreateVenueModal from "@/components/modals/CreateVenueModal";
import UpdateVenueModal from "@/components/modals/UpdateVenueModal";
import fetchVenueDetails from "@/utils/api/fetchVenueDetails";

const ManageVenues = () => {
  const [ownedVenues, setOwnedVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState({ bookings: [] });
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

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
    try {
      // Attempt to delete the venue
      await deleteVenue(venueId);

      // If the deletion was successful, refetch the list of owned venues
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData && userData.name) {
        const profileName = userData.name;

        const response = await fetchOwnedVenues(profileName);

        if (response) {
          setOwnedVenues(response);
        }
      }
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  };

  const defaultImageUrl =
    "https://images.unsplash.com/photo-1565024144485-d0076966fe6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9iaXR0b258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60";

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleUpdateVenue = (venue) => {
    setSelectedVenue(venue);
    setCreateModalOpen(false);
    setUpdateModalOpen(true);
  };

  const handleCardClick = async (venue) => {
    // Fetch the details, including bookings, for the selected venue
    const venueDetails = await fetchVenueDetails(venue.id);

    if (venueDetails) {
      setSelectedVenue(venueDetails);
    } else {
      // Handle the case where the fetch failed.
      console.error("Failed to fetch venue details.");
    }
  };

  return (
    <div className={styles.manageVenues}>
      <h1>Manage Venues</h1>
      <div className={styles.formContainer}></div>

      <div className={styles.createdVenue}>
        <div className={styles.createVenueCard}>
          <img src='/images/no-image-icon-23492.png' />
          <div className={styles.createVenueCardContent}>
            <h2>Create new venue</h2>
            <button onClick={openCreateModal}>Create Venue</button>
            <CreateVenueModal
              isOpen={isCreateModalOpen}
              onRequestClose={closeCreateModal}
            />
          </div>
        </div>

        {ownedVenues.map((venue) => (
          <div
            key={venue.id}
            className={styles.venueCard}
            onClick={() => handleCardClick(venue)}
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

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateVenue(venue);
                }}
                className={styles.updateButton}
              >
                Update Venue
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteVenue(venue.id);
                }}
                className={styles.deleteButton}
              >
                Delete Venue
              </button>
            </div>
          </div>
        ))}
      </div>

      {isUpdateModalOpen && (
        <UpdateVenueModal
          isOpen={isUpdateModalOpen}
          onRequestClose={() => setUpdateModalOpen(false)}
          venueData={selectedVenue}
        />
      )}

      <div className={styles.bookingsContainer}>
        {selectedVenue.bookings && selectedVenue.bookings.length > 0 && (
          <div>
            <h3>Bookings for {selectedVenue.name}</h3>
            <ul>
              {selectedVenue.bookings.map((booking) => (
                <li key={booking.id}>
                  Booking ID: {booking.id}, Date From: {booking.dateFrom}, Date
                  To: {booking.dateTo}, Guests: {booking.guests}, Created:{" "}
                  {booking.created}, Updated: {booking.updated}
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
