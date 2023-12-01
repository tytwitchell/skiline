import React from "react";
import styles from './footer.module.css'
import { GiMountains } from "react-icons/gi";

export default function Footer() {
  return (
    <footer>
      <GiMountains className={styles.logo} size="1.5rem" color="hsl(0 0% 100%)" />
      <p>
        Powered by <span>Snow</span>
      </p>
    </footer>
  );
}
