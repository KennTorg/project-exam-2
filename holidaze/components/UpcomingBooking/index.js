import React, { useEffect, useState } from "react";
import moment from "moment";
import { API_URL } from "@/utils/api/constants";
import { useRouter } from "next/router";

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
          setBookings(bookingData);
          setLoading(false);
        } else {
          setError("Failed to fetch upcoming bookings");
          setLoading(false);
        }
      } catch (error) {
        setError("An error occurred while fetching upcoming bookings");
        setLoading(false);
      }
    };

    // Call the fetchUpcomingBookings function when the component mounts
    fetchUpcomingBookings();
  }, [name]); // Run this effect when customerId changes

  // Loading state
  if (loading) {
    return <p>Loading upcoming bookings...</p>;
  }

  // Error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Upcoming Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <p>Booking ID: {booking.id}</p>
              <p>Start Date: {moment(booking.dateFrom).format("YYYY-MM-DD")}</p>
              <p>End Date: {moment(booking.dateTo).format("YYYY-MM-DD")}</p>
              <p>Guests: {booking.guests}</p>
              {/* Include venue information */}
              {booking.venue && (
                <>
                  <p>Venue Name: {booking.venue.name}</p>
                  <p>Venue Address: {booking.venue.location.address}</p>
                  {/* Add more venue details as needed */}
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming bookings found.</p>
      )}
    </div>
  );
};

export default UpcomingBookings;
