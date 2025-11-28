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