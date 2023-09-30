import { useEffect, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import VenueCalendar from "../VenueCalendar";
import styles from "./VenueDetails.module.scss";
import BookingForm from "../BookingForm";
import fetchVenueDetails from "@/utils/api/fetchVenueDetails";
import Loader from "../Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * VenueDetails component to display details about a venue and its availability.
 *
 * @component
 *
 * @param {string} venueId - The ID of the venue to display details for.
 *
 * @returns {JSX.Element} Rendered VenueDetails component.
 */
const VenueDetails = ({ venueId }) => {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookedDates, setBookedDates] = useState([]); // State to store booked dates

  useEffect(() => {
    // Define an async function to fetch venue details
    const fetchVenue = async () => {
      try {
        const venueData = await fetchVenueDetails(venueId);
        if (venueData) {
          setVenue(venueData);
        } else {
          setError("Failed to fetch venue details");
        }
      } catch (err) {
        setError("An error occurred while fetching venue details");
        console.error("Error fetching venue details:", err);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchVenue function when the component mounts
    fetchVenue();
  }, [venueId]); // Run this effect when venueId changes

  useEffect(() => {
    // Calculate booked dates when bookings data changes
    if (venue && venue.bookings && venue.bookings.length > 0) {
      const bookedDateRanges = venue.bookings.map((booking) => ({
        start: moment(booking.dateFrom).toDate(),
        end: moment(booking.dateTo).toDate(),
      }));

      setBookedDates(bookedDateRanges);
    }
  }, [venue]);

  // Loading state
  if (loading) {
    return <Loader />;
  }

  // Error state
  if (error) {
    toast.error("Error: " + error);
    return <p>Error: {error}</p>;
  }

  // Default image will show if there is no image added to the venue.
  const defaultImageUrl =
    "https://images.unsplash.com/photo-1565024144485-d0076966fe6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9iaXR0b258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60";

  return (
    <div className={styles.venueDetails}>
      {venue && (
        <>
          <div className={styles.imageContainer}>
            {Array.isArray(venue.media) && venue.media.length > 0 ? (
              venue.media.map((imageUrl, index) => (
                <img
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  key={index}
                  className={styles.image}
                  onError={(e) => {
                    e.target.src = defaultImageUrl; // Set a default image URL in case of loading failure
                  }}
                />
              ))
            ) : (
              <img
                src={defaultImageUrl}
                alt='Default Image'
                className={styles.image}
                onError={(e) => {
                  e.target.src = defaultImageUrl; // Set a default image URL in case of loading failure
                }}
              />
            )}
          </div>

          <h1 className={styles.name}>{venue.name}</h1>
          <div className={styles.meta}>
            <ul>
              <li>WiFi: {venue.meta.wifi ? "Yes" : "No"}</li>
              <li>Parking: {venue.meta.parking ? "Yes" : "No"}</li>
              <li>Breakfast: {venue.meta.breakfast ? "Yes" : "No"}</li>
              <li>Pets: {venue.meta.pets ? "Yes" : "No"}</li>
            </ul>
          </div>

          <div className={styles.description}>
            <p>{venue.description}</p>
          </div>

          <div className={styles.details}>
            <p className={styles.details}>Maximum Guests: {venue.maxGuests}</p>
            <p className={styles.details}>Rating: {venue.rating}</p>
            <p className={styles.details}>Created: {venue.created}</p>
            <p className={styles.details}>Updated: {venue.updated}</p>
          </div>

          <div className={styles.location}>
            <h4>Location:</h4>
            <p>Address: {venue.location.address}</p>
            <p>City: {venue.location.city}</p>
            <p>Zip: {venue.location.zip}</p>
            <p>Country: {venue.location.country}</p>
            <p>Continent: {venue.location.continent}</p>
          </div>

          <div className={styles.price}>
            <h3 className={styles.details}>Price: ${venue.price}</h3>
          </div>
        </>
      )}
      <div className={styles.calendar_container}>
        <h2>Available Dates:</h2>

        <VenueCalendar bookedDates={bookedDates} />
      </div>
      <div className={styles.booking_form}>
        <BookingForm venueId={venueId} />
      </div>
    </div>
  );
};

VenueDetails.propTypes = {
  venueId: PropTypes.string.isRequired,
};

export default VenueDetails;
