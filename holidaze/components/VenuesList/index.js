import React, { useState } from "react";
import styles from "./VenueList.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

const VenuesList = ({ venues }) => {
  const defaultImageUrl =
    "https://images.unsplash.com/photo-1565024144485-d0076966fe6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9iaXR0b258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60"; // Update with the correct path to your default image

  // Create state to manage the search input value
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search input changes
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter venues based on the search query
  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.venuesPage}>
      <div className={styles.headerVenues}>
        <h1>Book your dream today</h1>
      </div>
      <div className={styles.searchContainer}>
        <input
          type='text'
          className={styles.searchInput}
          placeholder='Search venues...'
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      <div className={styles.venuesList}>
        {filteredVenues.map((venue) => (
          <div key={venue.id} className={styles.card}>
            <img
              src={venue.media}
              alt={venue.name}
              className={styles.image}
              onError={(e) => {
                e.target.src = defaultImageUrl;
              }}
              key={venue.id}
            />
            <div className={styles.cardContent}>
              <h2 className={styles.name}>{venue.name}</h2>
              <p className={styles.rating}>
                Rating:
                {[...Array(Math.floor(venue.rating))].map((_, index) => (
                  <FontAwesomeIcon
                    icon={faStar}
                    className={styles.star}
                    key={index}
                  />
                ))}{" "}
                {venue.rating % 1 === 0.5 && (
                  <FontAwesomeIcon icon={faStarHalf} className={styles.star} />
                )}
              </p>
              {venue.location.city !== "unknown" &&
              venue.location.country !== "unknown" ? (
                <p className={styles.location}>
                  {venue.location.city}, {venue.location.country}
                </p>
              ) : null}
            </div>
            <div className={styles.button_container}>
              <Link href={`/venues/${venue.id}`}>
                <button className={styles.bookButton}>Book Now</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenuesList;
