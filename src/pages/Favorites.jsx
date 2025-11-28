import { useState, useMemo } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import styles from "./Favorites.module.css";

/**
 * Favorites page displaying all favorited episodes.
 * Features:
 * - Grouped by show title
 * - Sortable by date added (newest/oldest) or title (A-Z/Z-A)
 * - Filter by show
 * - Display episode details with play button
 * - Remove from favorites
 */
export default function Favorites() {
  const { favorites, removeFavorite, clearAllFavorites, getFavoritesByShow } =
    useFavorites();
  const { playEpisode } = useAudioPlayer();

  // Dropdown state for sorting options (newest/oldest or A-Z/Z-A)
  const [sortBy, setSortBy] = useState("newest");
  // Dropdown state for filtering episodes by show
  const [filterShow, setFilterShow] = useState("all");

// Create a sorted list of unique show titles for the filter dropdown
// Steps:
// - Take all showTitle values from favorites
// - Convert to a Set to remove duplicates
// - Spread back into an array
// - Sort alphabetically
// useMemo ensures this only recalculates when `favorites` changes
  const showTitles = useMemo(() => {
    const titles = [...new Set(favorites.map((fav) => fav.showTitle))];
    return titles.sort();
  }, [favorites]);