import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/Header";
import AudioPlayer from "./components/UI/AudioPlayer";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";
import Favorites from "./pages/Favorites";
import { PodcastProvider } from "./context/PodcastContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";

/**
 * Root component of the Podcast Explorer app.
 *
 * - Wraps the application in multiple context providers for global state management:
 *   - ThemeProvider: Theme toggling (light/dark mode)
 *   - PodcastProvider: Podcast data, filtering, sorting
 *   - FavoritesProvider: Favorite episodes management
 *   - AudioPlayerProvider: Global audio playback
 * - Includes the Header component (displayed on all pages)
 * - Includes the AudioPlayer component (fixed at bottom, shown when playing)
 * - Defines client-side routes using React Router:
 *    - "/" renders the Home page with recommended carousel
 *    - "/show/:id" renders the ShowDetail page for a specific podcast
 *    - "/favorites" renders the Favorites page with saved episodes
 *
 * @returns {JSX.Element} The application component with routing and context.
 */
export default function App() {
  return (
  // handles light/dark mode
    <ThemeProvider>
  {/* global audio player state */}
      <AudioPlayerProvider>
  {/* manages favorite episodes */}
        <FavoritesProvider>
 {/* fetches podcasts and handles filters */}
          <PodcastProvider>
  {/* always visible at top */}
            <Header />
 {/* routes to different pages */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/show/:id" element={<ShowDetail />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
{/* always visible at bottom when audio is playing */}
            <AudioPlayer />
          </PodcastProvider>
        </FavoritesProvider>
      </AudioPlayerProvider>
    </ThemeProvider>
  );
}