import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../Filters/ThemeToggle";
import { useFavorites } from "../../context/FavoritesContext";
import styles from "./Header.module.css";

export default function Header() {
// lets us check which page we are currently on
  const location = useLocation();
// get the list of favourite episodes
  const { favorites } = useFavorites();

  return (
    <header className={styles.appHeader}>
      {/* App title that links back home */}
      <h1>
        <Link to="/">🎙️ Podcast App</Link>
      </h1>

      {/* Main navigation */} 
      <nav className={styles.nav}>
      {/* highlight "Home" only when on the home page */}
        <Link
          to="/"
          className={`${styles.navLink} ${
            location.pathname === "/" ? styles.active : ""
          }`}
        >
          Home
        </Link>
      {/* favourites link with count */}
        <Link
          to="/favorites"
          className={`${styles.navLink} ${
            location.pathname === "/favorites" ? styles.active : ""
          }`}
        >
          <span className={styles.favIcon}>❤️</span>
          Favourites
          {favorites.length > 0 && (
            <span className={styles.favCount}>({favorites.length})</span>
          )}
        </Link>
      </nav>
    {/* light/dark mode toggle button */}
      <ThemeToggle />
    </header>
  );
}