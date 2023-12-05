import { useEffect, useState, createContext } from "react";

import Header from "./components/Header/Header";
import Forecast from "./components/Forecast/Forecast";
import Footer from "./components/Footer/Footer";

const AppContext = createContext();
export { AppContext };

export default function App() {
  const [data, setData] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [mtnForecastData, setMtnForecastData] = useState("");
  const [clickedResult, setClickedResult] = useState(null);
  const [mtnCoordinates, setMtnCoordinates] = useState({});
  const { lat, lon } = mtnCoordinates;

  // console.log(mtnForecastData, clickedResult);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json
            ?key=7e7e986488a04a789cf233454232911
            &q=${lat + "," + lon}
            &days=3
            &aqi=no
            &alerts=no`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setData(apiData);
        console.log("Fetch ran");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [mtnCoordinates]);

  console.log("data in app", data);

  const stylesDarkBgColor = {
    backgroundColor: darkMode ? "hsl(200 30% 8% )" : "hsl(200 20% 85%)",
    transition: "background-color .5s ease",
  };

  return (
    <AppContext.Provider
      value={{
        data,
        darkMode,
        setDarkMode,
        mtnForecastData,
        setMtnForecastData,
        clickedResult,
        setClickedResult,
        mtnCoordinates,
        setMtnCoordinates,
      }}
    >
      <span class="background-main"></span>
      <span class="background-texture" style={stylesDarkBgColor}></span>
      <Header />
      <Forecast />
      <Footer />
    </AppContext.Provider>
  );
}
