import { useState, useEffect } from "react";
import styles from "./header.module.css";
import mtnsData from "../../../utils/mtnsData";

export default function SearchBar({
  setSearchResults,
  clickedResult,
  setClickedResult,
  setShowResults,
  setMtnForecastData,
  mtnForecastData,
  mtnCoordinates,
  setMtnCoordinates,
}) {
  const [input, setInput] = useState("");
  const [mtnLabel, setMtnLabel] = useState("");

  useEffect(() => {
    let keys = [];
    const mountainValues = Object.values(mtnsData);
    const mountainData = mountainValues.map((mountain) => {
      keys.push(mountain.label);
      return mountain;
    });

    setMtnLabel(keys);
    setMtnForecastData(mountainData);
  }, []);

  useEffect(() => {
    if (mtnForecastData && clickedResult) {
      const targetMtnData = mtnForecastData.find(
        (mtn) => mtn.label === clickedResult
      );

      const coordinates = { lat: targetMtnData.lat, lon: targetMtnData.lon };

      setMtnCoordinates(coordinates);
    }
  }, [clickedResult]);

  const fetchData = (value) => {
    const searchResults = mtnLabel.filter((data) => {
      const dataLowerCase = data.toLowerCase();
      const valueLowerCase = value.toLowerCase();
      if (value === data) {
        setTimeout(() => {
          setShowResults(false);
        }, 5000);
      }
      return value && data && dataLowerCase.includes(valueLowerCase);
    });

    searchResults ? setSearchResults(searchResults) : setSearchResults(null);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
    setClickedResult(null);
  };

  const handleValue = () => {
    if (clickedResult) {
      return clickedResult;
    } else {
      return input;
    }
  };

  return (
    <>
      <input
        onChange={(e) => handleChange(e.target.value)}
        className={styles.searchBar}
        type="text"
        placeholder="Search"
        value={handleValue()}
      ></input>
    </>
  );
}
