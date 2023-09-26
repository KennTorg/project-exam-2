import React from "react";
import styles from "@/styles/pages/Home.module.scss";
import { useState, useEffect } from "react";
import { API_URL } from "@/utils/api/constants";
import Loader from "@/components/Loader";
import VenueCarousel from "@/components/VenueCarousel";

const HomeContent = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(`${API_URL}/venues`);
        if (response.ok) {
          const data = await response.json();
          setVenues(data);
        } else {
          console.error("Failed to fetch venues:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred while fetching venues:", error);
      } finally {
        setLoading(false);
      }
    };
    console.log(venues);
    fetchVenues();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home_container}>
      <img
        src='https://cdn.pixabay.com/photo/2016/11/22/19/17/buildings-1850129_1280.jpg'
        alt='Cityscape'
      />
      <div className={styles.home_boxes}>
        <div className={styles.home_box}>
          <h4>Where Dreams Find a Home</h4>
          <p>
            {" "}
            Embark on a journey to the most enchanting destinations, where azure
            waters meet golden sands and lush landscapes beckon. Your dream
            holiday is just a click away with Holidaze.
          </p>
        </div>
        <div className={styles.home_box}>
          <h4>Your Holiday Oasis Awaits</h4>
          <p>
            Imagine a world where relaxation knows no bounds, and adventure is
            around every corner. With Holidaze, you can escape to your own
            holiday oasis, where paradise becomes your reality.
          </p>
        </div>
        <div className={styles.home_box}>
          <h4>Where Dreams Find a Home</h4>
          <p>
            {" "}
            In the heart of every great vacation is the perfect place to stay.
            Discover our handpicked venues and create memories that will stay
            with you forever.
          </p>
        </div>
      </div>
      <VenueCarousel venues={venues} />
    </div>
  );
};

export default HomeContent;
