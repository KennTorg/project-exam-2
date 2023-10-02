import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./VenueCarousel.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VenueCarousel = ({ venues }) => {
  if (!venues || venues.length === 0) {
    toast.info("No venues available in the carousel.");
  }

  return (
    <div className={styles.carouselContainer}>
      <Carousel
        infiniteLoop
        autoPlay
        showThumbs={false}
        renderIndicator={false}
        className={styles.carousel}
      >
        {venues.map((venue, index) => (
          <div key={index} className={styles.carouselItem}>
            {venue.media ? (
              <img src={venue.media} alt={`Venue ${venue.name}`} />
            ) : (
              <img
                src="https://cdn.pixabay.com/photo/2016/11/22/19/17/buildings-1850129_1280.jpg"
                alt="Cityscape"
              />
            )}
            <h2 className={styles.locationText}>
              {venue.city}, {venue.country}
            </h2>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default VenueCarousel;
