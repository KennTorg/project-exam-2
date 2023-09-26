import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./VenueCarousel.module.scss";

const VenueCarousel = ({ venues }) => {
  return (
    <Carousel infiniteLoop autoPlay showThumbs={false} renderIndicator={false}>
      {venues.map((venue, index) => (
        <div key={index} className={styles.carouselItem}>
          {venue.media ? (
            <img src={venue.media} alt={`Venue ${venue.name}`} />
          ) : (
            <img
              src='https://cdn.pixabay.com/photo/2016/11/22/19/17/buildings-1850129_1280.jpg'
              alt='Cityscape'
            />
          )}
          <h2 className={styles.locationText}>
            {venue.city}
            <br></br> {venue.country}
          </h2>
        </div>
      ))}
    </Carousel>
  );
};

export default VenueCarousel;
