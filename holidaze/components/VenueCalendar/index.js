import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./VenueCalender.module.scss";

const VenueCalendar = ({ availableDates }) => {
  return (
    <div className={styles.calendar}>
      <Calendar
        tileClassName={({ date }) => {
          // Check if the date is in the availableDates array
          const isAvailable = availableDates.includes(date.toISOString());
          return isAvailable ? "custom-class" : ""; // Apply custom class if date is available
        }}
        value={new Date()} // Set the initial date if needed
      />
    </div>
  );
};

export default VenueCalendar;
