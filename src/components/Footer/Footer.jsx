import { useContext } from "react";
import styles from "./footer.module.css";
import { AppContext } from "../../App";
import { TbSunMoon } from "react-icons/tb";

import { GiMountains } from "react-icons/gi";

export default function Footer() {
  const { darkMode, setDarkMode } = useContext(AppContext);

  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }

  const stylesRotate = {
    transform: darkMode ? "rotate(180deg) translateX(10%)" : "none",
    transition: "transform .25s ease",
  };

  const stylesLightDarkWrapper = {
    justifyContent: darkMode ? "right" : "left",
    border: darkMode
      ? "1.5px solid hsl(0 0% 97% / .4)"
      : "1.5px solid hsl(0 0% 4% / .4)",
    transition:
      "border 1s ease",
  };

  const stylesColor = {
    color: darkMode ? "hsl(0 0% 97% / .6)" : "hsl(0 0% 4% / .6)",
    transition: "color 1s ease",
  };
  return (
    <footer style={stylesColor}>
      <GiMountains className={styles.logo} size="1.5rem" style={stylesColor} />
      <p>
        Powered by <span>Snow</span>
      </p>
      <span className={styles.lightDarkWrapper} style={stylesLightDarkWrapper}>
        <TbSunMoon
          size=".95rem"
          onClick={toggleDarkMode}
          style={stylesRotate}
          className={styles.lightDarkIcon}
        />
      </span>
    </footer>
  );
}
