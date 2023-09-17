import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./VenueCalender.module.scss";

const VenueCalendar = ({ bookedDates }) => {
  return (
    <div className={styles.calendar}>
      <Calendar
        tileContent={({ date, view }) => {
          // Check if bookedDates is defined
          if (!bookedDates) {
            return null;
          }

          // Check if the date is within a booked range
          const isBooked = bookedDates.some((booking) => {
            return (
              date >= new Date(booking.start) && date <= new Date(booking.end)
            );
          });

          // If it's the month view, show a custom content for booked dates
          if (view === "month" && isBooked) {
            return <div className='booked-day'>Booked</div>;
          }

          return null; // Return null for other cases
        }}
        value={new Date()} // Set the initial date if needed
      />
    </div>
  );
};

export default VenueCalendar;
