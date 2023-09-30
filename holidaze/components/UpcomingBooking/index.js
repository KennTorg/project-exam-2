import React, { useEffect, useState } from "react";
import moment from "moment";
import { API_URL } from "@/utils/api/constants";
import { useRouter } from "next/router";
import { saveToLocalStorage, loadFromLocalStorage } from "@/utils/localStorage";
import styles from "./UpcomingBooking.module.scss";
import Loader from "../Loader";

const UpcomingBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { name } = router.query;

  useEffect(() => {
    // Define an async function to fetch upcoming bookings for the customer
    const fetchUpcomingBookings = async () => {
      try {
        // Check if bookings exist in localStorage
        const storedBookings = loadFromLocalStorage("userBookings");

        if (storedBookings) {
          // If bookings exist in localStorage, set them as initial state
          setBookings(storedBookings);
        }

        // Get the access token from local storage
        const accessToken = JSON.parse(localStorage.getItem("accessToken"));

        // Define the query parameter for including the venue
        const queryParams = new URLSearchParams({ _venue: true });

        // Send a GET request to fetch upcoming bookings for the customer
        const response = await fetch(
          `${API_URL}/profiles/${name}/bookings?${queryParams.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const bookingData = await response.json();

          // Save the retrieved bookings to localStorage
          saveToLocalStorage("userBookings", bookingData);

          // Set the state with the retrieved bookings
          setBookings(bookingData);
        } else {
          setError("Failed to fetch upcoming bookings");
        }
      } catch (error) {
        setError("An error occurred while fetching upcoming bookings");
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchUpcomingBookings function when the component mounts
    if (name) {
      fetchUpcomingBookings();
    }
  }, [name]); // Run this effect when customerId changes

  // Loading state
  if (loading) {
    return <Loader />;
  }

  // Error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className={styles.upcomingBookingsHeader}>
        <h2>Upcoming Bookings</h2>
      </div>
      <div className={styles.upcomingBookings}>
        {bookings.length > 0 ? (
          <ul>
            {bookings.map((booking) => (
              <li key={booking.id}>
                <p>Booking ID: {booking.id}</p>
                <p>
                  Start Date: {moment(booking.dateFrom).format("YYYY-MM-DD")}
                </p>
                <p>End Date: {moment(booking.dateTo).format("YYYY-MM-DD")}</p>
                <p>Guests: {booking.guests}</p>

                {booking.venue && (
                  <>
                    <p>Venue Name: {booking.venue.name}</p>
                    <p>Venue Address: {booking.venue.location.address}</p>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no upcoming bookings.</p>
        )}
      </div>
    </>
  );
};

export default UpcomingBookings;
