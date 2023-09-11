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
    };

    // Call the fetchVenue and fetchBookings functions when the component mounts
    fetchVenue();
    fetchBookings();
  }, [venueId]); // Run this effect when venueId changes

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

  // Extract available dates from venue data (assuming venue.bookings contains the available dates)
  //const [availableDates, setAvailableDates] = useState([]);
  console.log(venueId);
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

          {/* <BookingForm venueId={venueId} /> */}
          {/* <VenueCalendar availableDates={availableDates} /> */}
        </>
      )}
    </div>
  );
};

export default VenueDetails;

// ==========================================================================================

// import React, { useEffect, useState, useRef } from "react";
// import moment from "moment";
// import VenueCalendar from "../VenueCalendar";
// import styles from "./VenueDetails.module.scss";
// import BookingForm from "../BookingForm";
// import fetchVenueDetails from "@/utils/api/fetchVenueDetails";

// const VenueDetails = ({ venueId }) => {
//   const [venue, setVenue] = useState(null);
//   const [availableDates, setAvailableDates] = useState([]);

//   // Store the previous venueId
//   const prevVenueId = usePrevious(venueId);

//   // Function to get the previous value of a prop or state
//   function usePrevious(value) {
//     const ref = useRef();
//     useEffect(() => {
//       ref.current = value;
//     });
//     return ref.current;
//   }

//   const getRangeOfDates = () => {
//     const startDate = moment(); // Use the current date as the start date
//     const endDate = moment().add(30, "days"); // Add 30 days to the current date

//     const dates = [];
//     let currentDate = startDate.clone();

//     while (currentDate.isSameOrBefore(endDate, "day")) {
//       dates.push(currentDate.toDate());
//       currentDate.add(1, "day");
//     }

//     return dates;
//   };

//   useEffect(() => {
//     // Call the fetchVenueDetails function to fetch venue data
//     const fetchVenue = async () => {
//       try {
//         const data = await fetchVenueDetails(venueId); // Use the function to get venue data
//         if (data) {
//           setVenue(data);

//           // Determine available dates
//           const bookedDates = data.bookings.map((booking) => ({
//             start: moment(booking.dateFrom).toDate(),
//             end: moment(booking.dateTo).toDate(),
//           }));
//           const allDates = getRangeOfDates();
//           const available = allDates.filter(
//             (date) =>
//               !bookedDates.some(
//                 (booking) => date >= booking.start && date <= booking.end
//               )
//           );
//           setAvailableDates(available);
//         } else {
//           console.error("Failed to fetch venue details");
//         }
//       } catch (error) {
//         console.error("An error occurred while fetching venue:", error);
//       }
//     };

//     // Check if the venueId has changed before fetching data
//     if (venueId !== prevVenueId) {
//       fetchVenue();
//     }
//   }, [venueId, prevVenueId]);

//   if (!venue) {
//     return <p>Loading venue details...</p>;
//   }

//   // Default image will show if there is no image added to the venue.
//   const defaultImageUrl =
//     "https://images.unsplash.com/photo-1565024144485-d0076966fe6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9iaXR0b258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60"; // Update with the correct path to your default image

//   return (
//     <div className={styles.venueDetails}>
//       <h1 className={styles.name}>{venue.name}</h1>
//       <div className={styles.imageContainer}>
//         {Array.isArray(venue.media) && venue.media.length > 0 ? (
//           venue.media.map((imageUrl, index) => (
//             <img
//               src={imageUrl}
//               alt={`Image ${index + 1}`}
//               key={index}
//               className={styles.image}
//               onError={(e) => {
//                 e.target.src = defaultImageUrl; // Set a default image URL in case of loading failure
//               }}
//             />
//           ))
//         ) : (
//           <img
//             src={defaultImageUrl}
//             alt='Default Image'
//             className={styles.image}
//             onError={(e) => {
//               e.target.src = defaultImageUrl; // Set a default image URL in case of loading failure
//             }}
//           />
//         )}
//       </div>
//       <p className={styles.description}>{venue.description}</p>

//       {/* Display other venue details */}
//       <p className={styles.details}>Price: {venue.price}</p>
//       <p className={styles.details}>Maximum Guests: {venue.maxGuests}</p>
//       <p className={styles.details}>Rating: {venue.rating}</p>
//       <p className={styles.details}>Created: {venue.created}</p>
//       <p className={styles.details}>Updated: {venue.updated}</p>

//       <div className={styles.meta}>
//         <p>Meta Information:</p>
//         <ul>
//           <li>WiFi: {venue.meta.wifi ? "Yes" : "No"}</li>
//           <li>Parking: {venue.meta.parking ? "Yes" : "No"}</li>
//           <li>Breakfast: {venue.meta.breakfast ? "Yes" : "No"}</li>
//           <li>Pets: {venue.meta.pets ? "Yes" : "No"}</li>
//         </ul>
//       </div>

//       <div className={styles.location}>
//         <p>Location:</p>
//         <p>Address: {venue.location.address}</p>
//         <p>City: {venue.location.city}</p>
//         <p>Zip: {venue.location.zip}</p>
//         <p>Country: {venue.location.country}</p>
//         <p>Continent: {venue.location.continent}</p>
//         <p>Latitude: {venue.location.lat}</p>
//         <p>Longitude: {venue.location.lng}</p>
//       </div>
//       <BookingForm venueId={venueId} />
//       <VenueCalendar availableDates={availableDates} />
//     </div>
//   );
// };

// export default VenueDetails;

// ==================================================================================

// import React, { useEffect, useState, useRef } from "react";
// import { API_URL } from "@/utils/api/constants";
// import moment from "moment";
// import VenueCalendar from "../VenueCalendar";
// import styles from "./VenueDetails.module.scss";
// import BookingForm from "../BookingForm";

// import fetchVenueDetails from "./fetchVenueDetails";

// const VenueDetails = ({ venueId }) => {
//   const [venue, setVenue] = useState(null);
//   const [availableDates, setAvailableDates] = useState([]);

//   // Store the previous venueId
//   const prevVenueId = usePrevious(venueId);

//   // Function to get the previous value of a prop or state
//   function usePrevious(value) {
//     const ref = useRef();
//     useEffect(() => {
//       ref.current = value;
//     });
//     return ref.current;
//   }

//   const getRangeOfDates = () => {
//     const startDate = moment(); // Use the current date as the start date
//     const endDate = moment().add(30, "days"); // Add 30 days to the current date

//     const dates = [];
//     let currentDate = startDate.clone();

//     while (currentDate.isSameOrBefore(endDate, "day")) {
//       dates.push(currentDate.toDate());
//       currentDate.add(1, "day");
//     }

//     return dates;
//   };

//   useEffect(() => {
//     const fetchVenue = async () => {
//       try {
//         const response = await fetch(
//           `${API_URL}/venues/${venueId}?_bookings=true`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setVenue(data);

//           // Determine available dates
//           const bookedDates = data.bookings.map((booking) => ({
//             start: moment(booking.dateFrom).toDate(),
//             end: moment(booking.dateTo).toDate(),
//           }));
//           const allDates = getRangeOfDates();
//           const available = allDates.filter(
//             (date) =>
//               !bookedDates.some(
//                 (booking) => date >= booking.start && date <= booking.end
//               )
//           );
//           setAvailableDates(available);
//         } else {
//           console.error("Failed to fetch venue:", response.statusText);
//         }
//       } catch (error) {
//         console.error("An error occurred while fetching venue:", error);
//       }
//     };

//     // Check if the venueId has changed before fetching data
//     if (venueId !== prevVenueId) {
//       fetchVenue();
//     }
//   }, [venueId, prevVenueId]);

//   if (!venue) {
//     return <p>Loading venue details...</p>;
//   }

//   // default image will show if there is no image added to the venue.
//   const defaultImageUrl =
//     "https://images.unsplash.com/photo-1565024144485-d0076966fe6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9iaXR0b258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60"; // Update with the correct path to your default image

//   return (
//     <div className={styles.venueDetails}>
//       <h1 className={styles.name}>{venue.name}</h1>
//       <div className={styles.imageContainer}>
//         {Array.isArray(venue.media) && venue.media.length > 0 ? (
//           venue.media.map((imageUrl, index) => (
//             <img
//               src={imageUrl}
//               alt={`Image ${index + 1}`}
//               key={index}
//               className={styles.image}
//               onError={(e) => {
//                 e.target.src = defaultImageUrl; // Set a default image URL in case of loading failure
//               }}
//             />
//           ))
//         ) : (
//           <img
//             src={defaultImageUrl}
//             alt='Default Image'
//             className={styles.image}
//             onError={(e) => {
//               e.target.src = defaultImageUrl; // Set a default image URL in case of loading failure
//             }}
//           />
//         )}
//       </div>
//       <p className={styles.description}>{venue.description}</p>

//       {/* Display other venue details */}
//       <p className={styles.details}>Price: {venue.price}</p>
//       <p className={styles.details}>Maximum Guests: {venue.maxGuests}</p>
//       <p className={styles.details}>Rating: {venue.rating}</p>
//       <p className={styles.details}>Created: {venue.created}</p>
//       <p className={styles.details}>Updated: {venue.updated}</p>

//       <div className={styles.meta}>
//         <p>Meta Information:</p>
//         <ul>
//           <li>WiFi: {venue.meta.wifi ? "Yes" : "No"}</li>
//           <li>Parking: {venue.meta.parking ? "Yes" : "No"}</li>
//           <li>Breakfast: {venue.meta.breakfast ? "Yes" : "No"}</li>
//           <li>Pets: {venue.meta.pets ? "Yes" : "No"}</li>
//         </ul>
//       </div>

//       <div className={styles.location}>
//         <p>Location:</p>
//         <p>Address: {venue.location.address}</p>
//         <p>City: {venue.location.city}</p>
//         <p>Zip: {venue.location.zip}</p>
//         <p>Country: {venue.location.country}</p>
//         <p>Continent: {venue.location.continent}</p>
//         <p>Latitude: {venue.location.lat}</p>
//         <p>Longitude: {venue.location.lng}</p>
//       </div>
//       {/* <BookingForm venueId={venueId} />
//       <VenueCalendar availableDates={availableDates} /> */}
//     </div>

//     // <div>
//     //   {/* Display venue details here */}
//     //   <h1>{venue.name}</h1>
//     //   {/* Other venue details */}
//     //   <VenueCalendar availableDates={availableDates} />
//     // </div>
//   );
// };

// export default VenueDetails;

// ====================================================================

// import { API_URL } from "@/utils/api/constants";
// import styles from "./VenueDetails.module.scss";
// import React, { useEffect, useState } from "react";
// import moment from "moment";
// import VenueCalendar from "../VenueCalendar";
// import BookingForm from "../BookingForm";

// const VenueDetails = ({ venueId }) => {
//   const [venue, setVenue] = useState(null);

//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchVenue = async () => {
//       try {
//         const response = await fetch(`${API_URL}/venues/${venueId}`);
//         if (response.ok) {
//           const data = await response.json();
//           setVenue(data);

//           console.log(data); // WORKS

//           // // Transform bookings into events
//           // const venueEvents = data.bookings
//           //   ? data.bookings.map((booking) => ({
//           //       title: "Venue Booked",
//           //       start: moment(booking.dateFrom).toDate(),
//           //       end: moment(booking.dateTo).toDate(),
//           //     }))
//           //   : [];

//           // setEvents(venueEvents);

//           // console.log(venueEvents);
//         } else {
//           console.error("Failed to fetch venue:", response.statusText);
//         }
//       } catch (error) {
//         console.error("An error occurred while fetching venue:", error);
//       }
//     };

//     if (venueId) {
//       fetchVenue();
//     }
//   }, [venueId]);

//   if (!venue) {
//     return <p>Loading venue details...</p>;
//   }

//   // default image will show if there is no image added to the venue.
//   const defaultImageUrl =
//     "https://images.unsplash.com/photo-1565024144485-d0076966fe6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9iaXR0b258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60"; // Update with the correct path to your default image

//   return (
//     <div className={styles.venueDetails}>
//       <h1 className={styles.name}>{venue.name}</h1>
//       <div className={styles.imageContainer}>
//         {Array.isArray(venue.media) && venue.media.length > 0 ? (
//           venue.media.map((imageUrl, index) => (
//             <img
//               src={imageUrl}
//               alt={`Image ${index + 1}`}
//               key={index}
//               className={styles.image}
//               onError={(e) => {
//                 e.target.src = defaultImageUrl; // Set a default image URL in case of loading failure
//               }}
//             />
//           ))
//         ) : (
//           <img
//             src={defaultImageUrl}
//             alt='Default Image'
//             className={styles.image}
//             onError={(e) => {
//               e.target.src = defaultImageUrl; // Set a default image URL in case of loading failure
//             }}
//           />
//         )}
//       </div>
//       <p className={styles.description}>{venue.description}</p>

//       {/* Display other venue details */}
//       <p className={styles.details}>Price: {venue.price}</p>
//       <p className={styles.details}>Maximum Guests: {venue.maxGuests}</p>
//       <p className={styles.details}>Rating: {venue.rating}</p>
//       <p className={styles.details}>Created: {venue.created}</p>
//       <p className={styles.details}>Updated: {venue.updated}</p>

//       <div className={styles.meta}>
//         <p>Meta Information:</p>
//         <ul>
//           <li>WiFi: {venue.meta.wifi ? "Yes" : "No"}</li>
//           <li>Parking: {venue.meta.parking ? "Yes" : "No"}</li>
//           <li>Breakfast: {venue.meta.breakfast ? "Yes" : "No"}</li>
//           <li>Pets: {venue.meta.pets ? "Yes" : "No"}</li>
//         </ul>
//       </div>

//       <div className={styles.location}>
//         <p>Location:</p>
//         <p>Address: {venue.location.address}</p>
//         <p>City: {venue.location.city}</p>
//         <p>Zip: {venue.location.zip}</p>
//         <p>Country: {venue.location.country}</p>
//         <p>Continent: {venue.location.continent}</p>
//         <p>Latitude: {venue.location.lat}</p>
//         <p>Longitude: {venue.location.lng}</p>
//       </div>
//       <BookingForm />
//       <VenueCalendar />
//     </div>
//   );
// };

// export default VenueDetails;
