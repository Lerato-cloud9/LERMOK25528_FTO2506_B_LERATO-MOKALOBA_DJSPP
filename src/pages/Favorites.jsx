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

/**
 * Creates a sorted and filtered list of favorites.
 * useMemo makes sure this only runs again when
 * favorites, sortBy, or filterShow changes.
 */
  const sortedFavorites = useMemo(() => {
    // Start with all favorites
    let filtered = [...favorites];

   // Filter by selected show 
    if (filterShow !== "all") {
      filtered = filtered.filter((fav) => fav.showTitle === filterShow);
    }

    // Sort the filtered list based on the selected option
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":  // Most recently added first
          return new Date(b.addedAt) - new Date(a.addedAt);
        case "oldest": // Earliest added first
          return new Date(a.addedAt) - new Date(b.addedAt);
        case "title-asc": // A → Z episode titles

          return a.episodeTitle.localeCompare(b.episodeTitle);
        case "title-desc": // Z → A episode titles
          return b.episodeTitle.localeCompare(a.episodeTitle);
        default:
          return 0;  // No sorting change
      }
    });

    return filtered; // Return the final list
  }, [favorites, sortBy, filterShow]);

/**
 * Groups favorite episodes by show title.
 * useMemo makes sure this only recalculates
 * when the sorted favorites list changes.
 */
  const groupedFavorites = useMemo(() => {
    const groups = {};

// Loop through each favorite and organize them by show name
    sortedFavorites.forEach((fav) => {
      if (!groups[fav.showTitle]) {
        groups[fav.showTitle] = []; // Create a new group if it doesn’t exist
      }
      groups[fav.showTitle].push(fav); // Add episode to the correct group
    });
    return groups;
  }, [sortedFavorites]);

  /**
   * Format date to readable string
   */
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

   /**
   * Handle play episode
   */
  const handlePlay = (favorite) => {
    playEpisode({
      id: favorite.id,
      audioFile: favorite.audioFile,
      title: favorite.episodeTitle,
      showTitle: favorite.showTitle,
      showImage: favorite.showImage,
    });
  };
  
  /**
 * If the user has no favorites saved yet,
 * show an empty state message instead of the list.
 */
  if (favorites.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.empty}>
          <h1>❤️ Favourite Episodes</h1>
          <p>Your saved episodes from all shows</p>
          <div className={styles.emptyState}>
            <p>No favorites yet!</p>
            <p>
              Start adding episodes to your favorites by clicking the heart icon
              on any episode.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
    {/* Page header with title and clear button */}
      <header className={styles.header}>
        <div>
          <h1>Favourite Episodes</h1>
          <p className={styles.subtitle}>
            Your saved episodes from all shows
          </p>
        </div>

        {/* Only show "Clear All" if there are favorites */}
        {favorites.length > 0 && (
          <button onClick={clearAllFavorites} className={styles.clearBtn}>
            Clear All
          </button>
        )}
      </header>

    {/* Sorting and filtering controls */}
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="sort-select">Sort by:</label>
    {/* Update sort type when user changes the dropdown */}
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.select}
          >
            <option value="newest">Newest Added</option>
            <option value="oldest">Oldest Added</option>
            <option value="title-asc">Title A → Z</option>
            <option value="title-desc">Title Z → A</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
       {/* Label for the filter dropdown */}
          <label htmlFor="filter-select">Filter:</label>
        {/* Dropdown to select which show to filter */}
          <select
            id="filter-select"
            value={filterShow}  // Current selected value
            onChange={(e) => setFilterShow(e.target.value)} // Update state when user selects a new show
            className={styles.select}
          >
            {/* Default option to show all shows */}
            <option value="all">All Shows</option>
            {/* Map through showTitles array and create an option for each show */}
            {showTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
      </div>

    {/* Container for all favorite episodes */}   
      <div className={styles.favorites}>
    {/* Loop through each show in groupedFavorites */}
        {Object.entries(groupedFavorites).map(([showTitle, episodes]) => (
          <section key={showTitle} className={styles.showGroup}>
            <div className={styles.showHeader}>
              <img
                src={episodes[0].showImage}
                alt={showTitle}
                className={styles.showImage}
              />
              {/* Show title and number of favorite episodes */}
              <h2 className={styles.showTitle}>
                {showTitle}
                <span className={styles.episodeCount}>
                  ({episodes.length} {episodes.length === 1 ? "episode" : "episodes"})
                </span>
              </h2>
            </div>
