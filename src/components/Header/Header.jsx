import { useContext } from "react";
import { GiMountains } from "react-icons/gi";
import styles from "./header.module.css";
import { AppContext } from "../../App";

export default function Header() {
  const { darkMode } = useContext(AppContext);

  const stylesHeader = {
    backgroundColor: darkMode
      ? "hsl(212, 5%, 38%, 0.45)"
      : "hsla(212, 5%, 30%, 0.45)",
    boxShadow: darkMode
      ? `
        0 1px inset hsl(0 0% 100% / 0.5),
        0 -10px 20px 10px hsl(0 0% 0% / 0.5) inset,
        0 10px 20px 10px hsl(0 0% 50% / 0.25) inset,
        0 1px hsl(0 0% 2% / 0.75)
      `
      : `
        0 2px inset hsl(0 0% 98%),
        0 -10px 20px 10px hsl(0 0% 96% / 0.3) inset, 
        0 10px 20px 10px hsl(0 0% 78% / 0.2) inset, 
        0 2px hsl(0 0% 96%)
      `,
      
    border: darkMode
      ? "1px solid hsl(0 0% 100% / 0.1)"
      : "1px solid hsl(0 0% 95% / 0.1)",

    transition: `
      background-color .5s ease 
      box-shadow .75s ease 
      border .75s ease
    `,
  };

  function handleSearch(e) {
    console.log(e.target.value);
  }

  return (
    <header>
      <nav style={stylesHeader}>
        <GiMountains className="logo" size="3rem" color="hsl(0 0% 100%)" />
        <h1>Skiline</h1>
        <input
          onChange={(e) => handleSearch(e)}
          className="search"
          type="text"
          placeholder="Search"
        ></input>
      </nav>
    </header>
  );
}
