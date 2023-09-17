import React, { useEffect, useState } from "react";
import moment from "moment";
import VenueCalendar from "../VenueCalendar";
import styles from "./VenueDetails.module.scss";
import BookingForm from "../BookingForm";
import fetchVenueDetails from "@/utils/api/fetchVenueDetails";
import fetchBookingDetails from "@/utils/api/fetchBookingDetails";

const VenueDetails = ({ venueId }) => {
  const [venue, setVenue] = useState(null);
  const [bookings, setBookings] = useState([]);
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
          console.log("Venue Data from API:", venueData);
        } else {
          setError("Failed to fetch venue details");
        }
      } catch (error) {
        setError("An error occurred while fetching venue details");
      }
    };

    // Define an async function to fetch booking details
    const fetchBookings = async () => {
      try {
        const bookingData = await fetchBookingDetails(venueId);
        if (bookingData) {
          setBookings(bookingData);
          console.log("Booking Data from API:", bookingData);
        }
      } catch (error) {
        setError("An error occurred while fetching booking details");
      } finally {
        setLoading(false);
      }
      console.log(venueId);
    };

    // Call the fetchVenue and fetchBookings functions when the component mounts
    fetchVenue();
    fetchBookings();
  }, [venueId]); // Run this effect when venueId changes

  useEffect(() => {
    // Calculate booked dates when bookings data changes
    if (bookings.length > 0) {
      const bookedDateRanges = bookings.map((booking) => ({
        start: moment(booking.dateFrom).toDate(),
        end: moment(booking.dateTo).toDate(),
      }));

      setBookedDates(bookedDateRanges);
    }
  }, [bookings]);

  // Loading state
  if (loading) {
    return <p>Loading venue details...</p>;
  }

  // Error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Default image will show if there is no image added to the venue.
  const defaultImageUrl =
    "https://images.unsplash.com/photo-1565024144485-d0076966fe6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9iaXR0b258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60"; // Update with the correct path to your default image

  return (
    <div className={styles.venueDetails}>
      {venue && (
        <>
          <h1 className={styles.name}>{venue.name}</h1>
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

          <div>
            <p className={styles.description}>{venue.description}</p>
            <p className={styles.details}>Price: {venue.price}</p>
            <p className={styles.details}>Maximum Guests: {venue.maxGuests}</p>
            <p className={styles.details}>Rating: {venue.rating}</p>
            <p className={styles.details}>Created: {venue.created}</p>
            <p className={styles.details}>Updated: {venue.updated}</p>
          </div>

          <div className={styles.meta}>
            <p>Meta Information:</p>
            <ul>
              <li>WiFi: {venue.meta.wifi ? "Yes" : "No"}</li>
              <li>Parking: {venue.meta.parking ? "Yes" : "No"}</li>
              <li>Breakfast: {venue.meta.breakfast ? "Yes" : "No"}</li>
              <li>Pets: {venue.meta.pets ? "Yes" : "No"}</li>
            </ul>
          </div>

          <div className={styles.location}>
            <p>Location:</p>
            <p>Address: {venue.location.address}</p>
            <p>City: {venue.location.city}</p>
            <p>Zip: {venue.location.zip}</p>
            <p>Country: {venue.location.country}</p>
            <p>Continent: {venue.location.continent}</p>
            <p>Latitude: {venue.location.lat}</p>
            <p>Longitude: {venue.location.lng}</p>
          </div>

          {/* Booking Details */}
          <div className={styles.bookings}>
            <h2>Bookings</h2>
            <ul>
              {venue.bookings && venue.bookings.length > 0 ? (
                venue.bookings.map((booking) => (
                  <li key={booking.id}>
                    <p>Booking ID: {booking.id}</p>
                    <p>
                      Start Date:{" "}
                      {moment(booking.dateFrom).format("YYYY-MM-DD")}
                    </p>
                    <p>
                      End Date: {moment(booking.dateTo).format("YYYY-MM-DD")}
                    </p>
                    <p>Guests: {booking.guests}</p>
                    {/* Add more booking details as needed */}
                  </li>
                ))
              ) : (
                <p>No bookings available for this venue.</p>
              )}
            </ul>
          </div>
          <div className={styles.calendarContainer}>
            <h2>Availability Calendar</h2>
            <VenueCalendar availableDates={bookedDates} />
          </div>

          <BookingForm venueId={venueId} />
        </>
      )}
    </div>
  );
};

export default VenueDetails;
