import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./VenueCalender.module.scss";

/**
 * VenueCalendar component to display a calendar with booked dates.
 *
 * @component
 *
 * @param {Array} bookedDates - An array of objects representing booked date ranges.
 *
 * @returns {JSX.Element} Rendered VenueCalendar component.
 */
const VenueCalendar = ({ bookedDates }) => {
  return (
    <div className={styles.calendar}>
      <Calendar
        tileDisabled={({ date }) => {
          if (!bookedDates) {
            return false;
          }

          return bookedDates.some((booking) => {
            return (
              date >= new Date(booking.start) && date <= new Date(booking.end)
            );
          });
        }}
        value={new Date()}
        className={styles.customCalendar}
      />
    </div>
  );
};

export default VenueCalendar;
