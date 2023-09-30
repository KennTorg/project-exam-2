import { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router
import PropTypes from "prop-types";
import { API_URL } from "@/utils/api/constants";
import styles from "./BookingForm.module.scss";
import { toast } from "react-toastify";

/**
 * BookingForm component for booking a venue.
 * @param {Object} props - The component's properties.
 * @param {number} props.venueId - The ID of the venue to book.
 * @returns {JSX.Element} The BookingForm component.
 */
const BookingForm = ({ venueId }) => {
  const [formData, setFormData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 1, // Default to 1 guest
  });

  const [loading, setLoading] = useState(false);

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const router = useRouter(); // Initialize the useRouter hook

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

    if (!accessToken) {
      router.push("/login");
      return;
    }

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
          toast.success("Booking successful!");
          // Resets the form
          setFormData({
            dateFrom: "",
            dateTo: "",
            guests: 1,
          });
        } else {
          toast.error("Booking failed. Please try again later.");
        }
      } else {
        toast.error("Guests must be a valid number.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.bookingForm}>
      <h2>Book this Venue:</h2>
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
    </div>
  );
};

BookingForm.propTypes = {
  venueId: PropTypes.string.isRequired,
};

export default BookingForm;
