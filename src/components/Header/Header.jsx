import { useContext, useState } from "react";
import { GiMountains } from "react-icons/gi";
import styles from "./header.module.css";
import SearchBar from "./SearchBar";
import { AppContext } from "../../App";
import SearchResultsList from "./SearchResultsList";

export default function Header() {
  const {
    darkMode,
    mtnForecastData,
    setMtnForecastData,
    clickedResult,
    setClickedResult,
    mtnCoordinates,
    setMtnCoordinates,
  } = useContext(AppContext);
  const [searchResults, setSearchResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  // const [clickedResult, setClickedResult] = useState(null);

  const stylesHeader = {
    backgroundColor: darkMode
      ? "hsl(212, 5%, 38%, 0.45)"
      : "hsl(212, 5%, 30%, 0.45)",
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
      background-color 1s ease 
      box-shadow 1s ease 
      border 1s ease
    `,
  };

  return (
    <header>
      <nav style={stylesHeader}>
        <GiMountains className="logo" size="2.5rem" color="hsl(0 0% 100%)" />
        <h1>Skiline</h1>
        <div className={styles.searchWrapper}>
          <SearchBar
            setSearchResults={setSearchResults}
            clickedResult={clickedResult}
            setClickedResult={setClickedResult}
            setShowResults={setShowResults}
            mtnForecastData={mtnForecastData}
            setMtnForecastData={setMtnForecastData}
            mtnCoordinates={mtnCoordinates}
            setMtnCoordinates={setMtnCoordinates}
          />
          <SearchResultsList
            searchResults={searchResults}
            setClickedResult={setClickedResult}
            showResults={showResults}
            setShowResults={setShowResults}
          />
        </div>
      </nav>
    </header>
  );
}
