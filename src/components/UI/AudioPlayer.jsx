import { useAudioPlayer } from "../../context/AudioPlayerContext";
import styles from "./AudioPlayer.module.css";

/**
 * Global audio player component fixed at bottom of screen.
 * Displays currently playing episode with playback controls.
 * Only visible when an episode is loaded.
 */
export default function AudioPlayer() {
// Destructure audio state and control functions from context
  const {
    currentEpisode,  // currently playing episode object
    isPlaying,       // true if audio is playing
    currentTime,     // current playback time in seconds
    duration,        // total duration of episode in seconds
    togglePlayPause, // function to play/pause audio
    seek,            // function to jump to a specific time
    skipBackward,    // function to go back few seconds
    skipForward,     // function to go forward few seconds
  } = useAudioPlayer();

  // If no episode is loaded, don't render anything
  if (!currentEpisode) return null;

  /**
   * Format time in seconds to MM:SS format
   * @param {number} seconds
   * @returns {string} Formatted time
   */
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00"; // default if invalid
    const mins = Math.floor(seconds / 60);         // calculate minutes
    const secs = Math.floor(seconds % 60);         // calculate remaining seconds
    return `${mins}:${secs.toString().padStart(2, "0")}`;  // pad single digits
  };

  // Calculate progress as percentage of total duration
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
