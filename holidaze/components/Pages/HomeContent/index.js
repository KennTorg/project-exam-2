import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/Home.module.scss";
import { API_URL } from "@/utils/api/constants";
import Loader from "@/components/Loader";
import VenueCarousel from "@/components/VenueCarousel";
import Link from "next/link";
import UserProfile from "@/components/UserProfile";
import { toast } from "react-toastify"; // Import the toast library

/**
 * HomeContent component for displaying the home page content.
 *
 * @component
 */
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
          // Show an error toast if fetching venues fails
          toast.error("Failed to fetch venues");
        }
      } catch (error) {
        console.error("An error occurred while fetching venues:", error);
        // Show an error toast for the error
        toast.error("An error occurred while fetching venues");
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home_container}>
      <div className={styles.headerImageContainer}>
        <UserProfile />
        <img
          className={`${styles.headerImage} zoom`}
          src='https://cdn.pixabay.com/photo/2016/11/22/19/17/buildings-1850129_1280.jpg'
          alt='Cityscape'
        />
      </div>
      <div className={styles.home_boxes}>
        <Link href='/venues'>
          <div className={styles.home_box1}>
            <h4>The Journey Awaits</h4>
            <p>
              Embark on a journey to the most enchanting destinations, where
              azure waters meet golden sands
            </p>
          </div>
        </Link>
        <Link href='/venues'>
          <div className={styles.home_box2}>
            <h4>Your Holiday Oasis Awaits</h4>
            <p>
              Imagine a world where relaxation knows no bounds, and adventure is
              around every corner. With Holidaze
            </p>
          </div>
        </Link>
        <Link href='/venues'>
          <div className={styles.home_box3}>
            <h4>Where Dreams Find a Home</h4>
            <p>
              In the heart of every great vacation is the perfect place to stay.
            </p>
          </div>
        </Link>

      </div>
      <div className={styles.carouselWrapper}>
        <VenueCarousel venues={venues} />
      </div>
      
    </div>
  );
};

export default HomeContent;
