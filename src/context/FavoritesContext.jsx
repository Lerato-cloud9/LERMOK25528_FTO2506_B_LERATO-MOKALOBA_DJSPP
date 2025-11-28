import React, { createContext, useContext, useState, useEffect, useRef } from "react";

/**
 * Context for managing global audio player state.
 * Handles playback, progress tracking, and localStorage persistence.
 */
export const AudioPlayerContext = createContext();

/* ---------------- Custom hook ---------------- */
/**
 * Custom hook to access audio player context anywhere in the app.
 * Throws error if used outside AudioPlayerProvider.
 */
export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  }
  return context;
}

/**
 * Provider component for global audio player.
 * Manages audio playback state and persists listening progress.
 */
export function AudioPlayerProvider({ children }) {
  const [currentEpisode, setCurrentEpisode] = useState(null);  // episode being played
  const [isPlaying, setIsPlaying] = useState(false);           // true if audio is playing
  const [currentTime, setCurrentTime] = useState(0);           // current playback time
  const [duration, setDuration] = useState(0);                 // total duration of audio
  const audioRef = useRef(new Audio());                        // ref to audio element

    // Load saved progress when episode changes
  useEffect(() => {
    if (currentEpisode) {
    // Try to get saved playback progress from localStorage
      const saved = localStorage.getItem(`progress-${currentEpisode.id}`);
      if (saved) {
        const progress = JSON.parse(saved);
    // Set audio's current time to saved progress
        audioRef.current.currentTime = progress.time;
        setCurrentTime(progress.time);
      }
    }
  }, [currentEpisode]); // Runs every time the current episode changes

  // Save progress periodically while playing
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentEpisode && isPlaying) {
  // Save current playback time, duration, and timestamp
        localStorage.setItem(
          `progress-${currentEpisode.id}`,
          JSON.stringify({
            time: audioRef.current.currentTime,
            duration: audioRef.current.duration,
            lastPlayed: new Date().toISOString(),
          })
        );
      }
    }, 5000); // Save every 5 seconds

    return () => clearInterval(interval);
  }, [currentEpisode, isPlaying]);

  // Warn user before leaving page during playback
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isPlaying) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isPlaying]);

    /**
   * Play an episode
   * @param {Object} episode - Episode data with id, audioFile, title, showTitle, showImage
   */
  const playEpisode = (episode) => {
    if (currentEpisode?.id === episode.id) {
    // If the episode is already loaded, just play it
      audioRef.current.play();
      setIsPlaying(true);
    } else {
    // Load new episode audio source
      audioRef.current.src = episode.audioFile;
      audioRef.current.load();   // Ensure browser loads new file
      audioRef.current.play();   // Start playback
      setCurrentEpisode(episode);// Update current episode state
      setIsPlaying(true);        // Set playing state
    }
  };

  /**
   * Pause playback
   */
  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  /**
   * Toggle between play and pause
   */
  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else if (currentEpisode) {
      audioRef.current.play();  // If paused and episode loaded, play
      setIsPlaying(true);       // Update state
    }
  };

    /**
   * Seek to a specific time
   * @param {number} time - Time in seconds
   */
  const seek = (time) => {
    audioRef.current.currentTime = time; // Update audio element
    setCurrentTime(time);                // Update state for UI

  };

  /**
   * Skip forward by seconds
   * @param {number} seconds - Seconds to skip (default 15)
   */
  const skipForward = (seconds = 15) => {
    // Ensure we don't exceed the episode duration
    const newTime = Math.min(audioRef.current.currentTime + seconds, duration);
    seek(newTime); // Use seek to update audio and state
  };

  /**
   * Skip backward by seconds
   * @param {number} seconds - Seconds to skip back (default 15)
   */
  const skipBackward = (seconds = 15) => {
    // Ensure we don't go below 0
    const newTime = Math.max(audioRef.current.currentTime - seconds, 0);
    seek(newTime); // Use seek to update audio and state
  };

  /**
   * Get saved progress for an episode
   * @param {string} episodeId - Episode ID
   * @returns {Object|null} Progress object or null
   */
  const getSavedProgress = (episodeId) => {
    const saved = localStorage.getItem(`progress-${episodeId}`);
    return saved ? JSON.parse(saved) : null;
  };