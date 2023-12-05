import { useContext } from "react";
import styles from "./footer.module.css";
import { AppContext } from "../../App";

import { GiMountains } from "react-icons/gi";

export default function Footer() {
  const { darkMode } = useContext(AppContext);

  const stylesColor = {
    color: darkMode ? "hsl(0 0% 97% / .6)" : "hsl(0 0% 4% / .6)",
    transition: "color 2s ease",
  };
  return (
    <footer style={stylesColor}>
      <GiMountains className={styles.logo} size="1.5rem" style={stylesColor} />
      <p>
        Powered by <span>Snow</span>
      </p>
    </footer>
  );
}
