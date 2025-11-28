import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecommendedCarousel.module.css";
import GenreTags from "../UI/GenreTags";
import { PodcastContext } from "../../context/PodcastContext";
import { useFavorites } from "../../context/FavoritesContext";

/**
 * Horizontal scrollable carousel displaying recommended podcast shows.
 * Features:
 * - Left/right navigation buttons
 * - Touch/swipe support
 * - Loops infinitely
 * - Shows podcast image, title, and genre tags
 * - Favorite indicator
 */
export default function RecommendedCarousel() {
  const { allPodcasts } = useContext(PodcastContext);  // Get all podcasts from context
  const { favorites } = useFavorites();                // Get user favorites from context
  const scrollRef = useRef(null);                      // Reference to the scrollable container
  const navigate = useNavigate();                      // Navigate to podcast detail page

  // Get random selection of podcasts for recommendations (or use first 12)
  const recommendedShows = allPodcasts.slice(0, 12);

  /**
   * Scroll the carousel left or right
   * @param {string} direction - 'left' or 'right'
   */
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  
  /**
   * Navigate to the show detail page when a show card is clicked
   * @param {Object} show - Show data
   */
  const handleShowClick = (show) => {
  // Use react-router navigate to go to the show detail page
  // Pass genres in state for potential use on the detail page
    navigate(`/show/${show.id}`, { state: { genres: show.genres } });
  };

  /**
   * Check if a show has any favorited episodes
   * @param {string|number} showId
   * @returns {boolean} True if user has favorited any episode from this show
   */
  const hasFavorites = (showId) => {
    return favorites.some((fav) => fav.showId === showId);
  };

  // If no recommended shows, render nothing
  if (recommendedShows.length === 0) return null;

  return (
    <section className={styles.carouselSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recommended Shows</h2>
      </div>

      <div className={styles.carouselContainer}>
        {/* Left scroll button */}
        <button
          onClick={() => scroll("left")}
          className={`${styles.navBtn} ${styles.navBtnLeft}`}
          aria-label="Scroll left"
        >
          ‹
        </button>

       {/* Scrollable carousel */}
        <div ref={scrollRef} className={styles.carousel}>
          {recommendedShows.map((show) => (
            <div
              key={show.id}
              className={styles.card}
              onClick={() => handleShowClick(show)}
            >
        {/* Favorite indicator if user has any favorites from this show */}
              {hasFavorites(show.id) && (
                <div className={styles.favoriteIndicator}>❤️</div>
              )}

              {/* Show image */}
              <img
                src={show.image}
                alt={show.title}
                className={styles.cardImg}
              />

               {/* Show title and genre tags */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{show.title}</h3>
                <GenreTags genres={show.genres} />
              </div>
            </div>
          ))}
        </div>

       {/* Right scroll button */}
        <button
          onClick={() => scroll("right")}
          className={`${styles.navBtn} ${styles.navBtnRight}`}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </section>
  );
}