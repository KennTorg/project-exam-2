// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; // If you're using React Router
// import { fetchVenueDetails } from "@/utils/api/fetchVenue";

// const BookingForm = ({ onBookingSuccess }) => {
//   const { venueId } = useParams(); // Get the venueId from the URL params

//   const [formData, setFormData] = useState({
//     dateFrom: "",
//     dateTo: "",
//     guests: 0,
//   });

//   const [venueDetails, setVenueDetails] = useState(null);

//   useEffect(() => {
//     // Fetch venue details when the component mounts
//     fetchVenueDetails(venueId)
//       .then((data) => {
//         if (data) {
//           setVenueDetails(data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching venue details:", error);
//       });
//   }, [venueId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     // Format dateFrom and dateTo to ISO 8601 format
//     const formattedDateFrom = new Date(formData.dateFrom).toISOString();
//     const formattedDateTo = new Date(formData.dateTo).toISOString();

//     try {
//       // Retrieve the access token from localStorage
//       const accessToken = localStorage.getItem("accessToken");

//       const headers = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       };

//       // Create the booking request
//       const response = await fetch(`${API_URL}/bookings`, {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify({
//           dateFrom: formattedDateFrom,
//           dateTo: formattedDateTo,
//           guests: parseInt(formData.guests), // Ensure guests is a number
//           venueId: venueId,
//         }),
//       });

//       if (response.ok) {
//         onBookingSuccess();
//         // Clear the form or show a success message
//       } else {
//         console.error("Failed to create booking:", response.statusText);
//       }
//     } catch (error) {
//       console.error("An error occurred while creating booking:", error);
//     }
//   };

//   console.log("Form Data:", formData);

//   return (
//     <div>
//       {venueDetails ? (
//         <>
//           <h2>Book {venueDetails.name}</h2>
//           <p>{venueDetails.description}</p>
//           <form onSubmit={handleFormSubmit}>
//             {/* Form input fields */}
//             {/* ... */}
//             <button type='submit'>Book Now</button>
//           </form>
//         </>
//       ) : (
//         <p>Loading venue details...</p>
//       )}
//     </div>
//   );
// };

// export default BookingForm;

// ===========================================================================================

// import React, { useState } from "react";
// import { API_URL } from "@/utils/api/constants";

// const BookingForm = ({ venueId, onBookingSuccess }) => {
//   const [formData, setFormData] = useState({
//     dateFrom: "",
//     dateTo: "",
//     guests: 0,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     // Format dateFrom and dateTo to ISO 8601 format
//     const formattedDateFrom = new Date(formData.dateFrom).toISOString();
//     const formattedDateTo = new Date(formData.dateTo).toISOString();

//     try {
//       // Retrieve the access token from localStorage
//       const formData = localStorage.getItem("accessToken");

//       // THERE IS SOMETHING WIERD HERE FIX THIS =========================
//       const headers = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       };

//       const response = await fetch(`${API_URL}/bookings`, {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify({
//           dateFrom: formattedDateFrom,
//           dateTo: formattedDateTo,
//           guests: parseInt(formData.guests), // Ensure guests is a number
//           venueId: venueId,
//         }),
//       });
//       console.log(storedData);

//       if (response.ok) {
//         // onBookingSuccess();
//         // Clear the form or show a success message
//       } else {
//         console.error("Failed to create booking:", response.statusText);
//       }
//     } catch (error) {
//       console.error("An error occurred while creating booking:", error);
//     }
//   };

//   console.log("Form Data:", formData);

//   return (
//     <div>
//       <h2>Book this venue</h2>
//       <form onSubmit={handleFormSubmit}>
//         <label>
//           Check-in Date:
//           <input
//             type='date'
//             name='dateFrom'
//             value={formData.dateFrom}
//             onChange={handleInputChange}
//             required
//           />
//         </label>
//         <label>
//           Check-out Date:
//           <input
//             type='date'
//             name='dateTo'
//             value={formData.dateTo}
//             onChange={handleInputChange}
//             required
//           />
//         </label>
//         <label>
//           Number of Guests:
//           <input
//             type='number'
//             name='guests'
//             value={formData.guests}
//             onChange={handleInputChange}
//             required
//           />
//         </label>
//         <button type='submit'>Book Now</button>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;
