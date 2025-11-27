import { Link } from "react-router-dom";
import ThemeToggle from "../Filters/ThemeToggle";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.appHeader}>
      <h1>
        <Link to="/">🎙️ Podcast App</Link>
      </h1>
      <ThemeToggle />
    </header>
  );
}