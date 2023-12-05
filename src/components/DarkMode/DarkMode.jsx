import { useContext } from "react";
import { TbSunMoon } from "react-icons/tb";
import { AppContext } from "../../App";
import styles from "./darkMode.module.css";

export default function DarkMode() {
  const { darkMode, setDarkMode } = useContext(AppContext);

  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }

  const stylesRotate = {
    transform: darkMode ? "rotate(180deg)" : "none",
    transition: "transform 1s ease",
  };

  const stylesLightDarkEl = {
    background: darkMode
      ? "linear-gradient(transparent 50%, hsl(0 0% 30% / 0.5)), hsl(0 0% 0%)"
      : "linear-gradient(transparent 50%, hsl(0 0% 70% / 0.5)), hsl(0 0% 95%)",
    boxShadow: "0 -1px inset hsl(0 0% 0% / 0.35)",
    transform: darkMode ? "rotate(180deg)" : "none",
    border: darkMode
      ? "1px solid hsl(0 0% 100% / 0.1)"
      : "1px solid hsl(0 0% 95% / .1)",
    color: darkMode ? "hsl(0 0% 93% / 0.98)" : "hsl(0 0% 4% / 0.8)",
    transition:
      "color 2s ease background 2s ease boxShadow 2s ease transform 2s ease",
  };


  return (
    <>
      <span className={styles.backdrop}>
        <span className={styles.lightDark} style={stylesLightDarkEl}></span>
        <TbSunMoon
          size=".8rem"
          onClick={toggleDarkMode}
          style={stylesRotate}
          className={styles.lightDarkIcon}
        />
      </span>
    </>
  );
}
