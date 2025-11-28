import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * Context for managing favorite episodes across the app.
 * Stores favorites in localStorage for persistence.
 */
export const FavoritesContext = createContext();

/**
 * Custom hook to access favorites context.
 * @throws {Error} If used outside of FavoritesProvider.
 */
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}

/**
 * Provider component for favorites functionality.
 * Manages adding, removing, and checking favorite episodes.
 * Persists data to localStorage.
 */
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("podcast-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("podcast-favorites", JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Add an episode to favorites
   * @param {Object} episode - Episode data
   * @param {Object} showData - Show data (id, title, image)
   * @param {number} seasonNumber - Season number
   */
  const addFavorite = (episode, showData, seasonNumber) => {
    const favorite = {
      id: `${showData.id}-${seasonNumber}-${episode.episode}`,
      episodeId: episode.episode,
      seasonNumber: seasonNumber,
      showId: showData.id,
      showTitle: showData.title,
      showImage: showData.image,
      episodeTitle: episode.title,
      episodeDescription: episode.description,
      audioFile: episode.file,
      addedAt: new Date().toISOString(),
    };
    setFavorites((prev) => [...prev, favorite]);
  };

  /**
   * Remove an episode from favorites by ID
   * @param {string} id - Composite ID (showId-seasonNumber-episodeId)
   */
  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  /**
   * Check if an episode is favorited
   * @param {string|number} showId
   * @param {number} seasonNumber
   * @param {number} episodeId
   * @returns {boolean}
   */
  const isFavorite = (showId, seasonNumber, episodeId) => {
    const id = `${showId}-${seasonNumber}-${episodeId}`;
    return favorites.some((fav) => fav.id === id);
  };

  /**
   * Clear all favorites with confirmation
   */
  const clearAllFavorites = () => {
    if (window.confirm("Are you sure you want to clear all favorites?")) {
      setFavorites([]);
    }
  };

  /**
   * Get favorites grouped by show title
   * @returns {Object} Object with show titles as keys and arrays of episodes as values
   */
  const getFavoritesByShow = () => {
    return favorites.reduce((acc, fav) => {
      if (!acc[fav.showTitle]) {
        acc[fav.showTitle] = [];
      }
      acc[fav.showTitle].push(fav);
      return acc;
    }, {});
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearAllFavorites,
    getFavoritesByShow,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}