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