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

    return (
    <div className={styles.player}>
     {/*  Player Info (Left side) */}
      <div className={styles.playerInfo}>
     {/* Show image of the podcast if available */}
        {currentEpisode.showImage && (
          <img
            src={currentEpisode.showImage}
            alt={currentEpisode.showTitle}
            className={styles.playerImg}
          />
        )}

        {/* Episode title and show title */}
        <div className={styles.episodeInfo}>
          <div className={styles.playerTitle}>{currentEpisode.title}</div>
          <div className={styles.playerShow}>{currentEpisode.showTitle}</div>
        </div>
      </div>

    {/*  Player Controls (Right side)  */}
      <div className={styles.playerControls}>
    {/* Skip backward 15 seconds */}   
        <button
          onClick={() => skipBackward(15)}
          className={styles.skipBtn}
          aria-label="Skip backward 15 seconds"
        >
          ⏪
        </button>

    {/* Play/Pause button */}
        <button
          onClick={togglePlayPause}
          className={styles.playPauseBtn}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

    {/* Skip forward 15 seconds */}
        <button
          onClick={() => skipForward(15)}
          className={styles.skipBtn}
          aria-label="Skip forward 15 seconds"
        >
          ⏩
        </button>

    {/* Progress bar and time display */}
        <div className={styles.progressContainer}>
          <span className={styles.timeText}>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))} // seek to new time
            className={styles.progressBar}
            aria-label="Seek"
          />
          <span className={styles.timeText}>{formatTime(duration)}</span>
        </div>

    {/* Show queue button */}
        <button className={styles.queueBtn} aria-label="Show queue">
          ☰
        </button>
      </div>
    </div>
  );
}