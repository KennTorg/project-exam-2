import React, { useState } from "react";
import { API_URL } from "@/utils/api/constants";

const BookingForm = ({ venueId }) => {
  const [formData, setFormData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 1, // Default to 1 guest
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format the date fields in ISO 8601 format
      const isoDateFrom = new Date(formData.dateFrom).toISOString();
      const isoDateTo = new Date(formData.dateTo).toISOString();

      // Parse the guests value as an integer
      const guests = parseInt(formData.guests, 10);

      // Check if guests is a valid number
      if (!isNaN(guests)) {
        // Send a POST request to create the booking
        const response = await fetch(`${API_URL}/bookings`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dateFrom: isoDateFrom, // Format dateFrom
            dateTo: isoDateTo, // Format dateTo
            guests: guests, // Use the parsed guests value
            venueId: venueId,
          }),
        });

        if (response.ok) {
          setSuccess(true);
          setError(null);
          // Resets the form
          setFormData({
            dateFrom: "",
            dateTo: "",
            guests: 1,
          });
        } else {
          setSuccess(false);
          setError("Booking failed. Please try again later.");
        }
      } else {
        setSuccess(false);
        setError("Guests must be a valid number.");
      }
    } catch (error) {
      setSuccess(false);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Book this Venue</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='dateFrom'>Start Date:</label>
          <input
            type='datetime-local'
            id='dateFrom'
            name='dateFrom'
            value={formData.dateFrom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='dateTo'>End Date:</label>
          <input
            type='datetime-local'
            id='dateTo'
            name='dateTo'
            value={formData.dateTo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='guests'>Number of Guests:</label>
          <input
            type='number'
            id='guests'
            name='guests'
            value={formData.guests}
            onChange={handleChange}
            min='1'
            required
          />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>
      {error && <p className='error'>{error}</p>}
      {success && <p className='success'>Booking successful!</p>}
    </div>
  );
};

export default BookingForm;
