import { useContext } from "react";
import {
  SearchBar,
  SortSelect,
  GenreFilter,
  PodcastGrid,
  Pagination,
  Loading,
  Error,
} from "../components";
import RecommendedCarousel from "../components/UI/RecommendedCarousel";
import styles from "./Home.module.css";
import { genres } from "../data";
import { PodcastContext } from "../context/PodcastContext";

/**
 * Home page of the Podcast Explorer app.
 *
 * - Displays the main podcast browsing interface.
 * - Shows a recommended carousel at the top with horizontally scrollable shows.
 * - Includes search, genre filter, and sort controls.
 * - Shows a loading indicator or error message based on fetch state.
 * - Renders the podcast grid and pagination once data is loaded.
 *
 * Context:
 * - Consumes PodcastContext to access podcast data, loading, and error states.
 *
 * @returns {JSX.Element} The home page content with carousel, filters, results, and feedback states.
 */
export default function Home() {
  const { podcasts, loading, error } = useContext(PodcastContext);

  return (
    <main className={styles.main}>
      {loading && <Loading message="Loading podcasts..." />}
      
      {error && (
        <Error message={`Error occurred while fetching podcasts: ${error}`} />
      )}

      {!loading && !error && (
        <>
          <RecommendedCarousel />
          
          <section className={styles.controls}>
            <SearchBar />
            <GenreFilter genres={genres} />
            <SortSelect />
          </section>

          <PodcastGrid />
          <Pagination />
        </>
      )}
    </main>
  );
}