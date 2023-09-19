// VenueCalendar.js

import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./VenueCalender.module.scss";

const VenueCalendar = ({ bookedDates }) => {
  return (
    <div className={styles.calendar}>
      <Calendar
        tileDisabled={({ date }) => {
          // Check if bookedDates is defined
          if (!bookedDates) {
            return false;
          }

          // Check if the date is within a booked range
          return bookedDates.some((booking) => {
            return (
              date >= new Date(booking.start) && date <= new Date(booking.end)
            );
          });
        }}
        value={new Date()}
        className={styles.customCalendar} // You can add your custom styles here
      />
    </div>
  );
};

export default VenueCalendar;
