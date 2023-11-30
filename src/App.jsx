import { useEffect, useState, createContext } from "react";

import Header from "./components/Header/Header";
import Forecast from "./components/Forecast/Forecast";
import Footer from "./components/Footer/Footer";

/**
 * 1) make a component that shows search results (exact mountain and
 * other relative mountains in the state)
 * 2) display a forcast for the mountains weather results including:
 *   a) snow fall
 *   b) temp
 *   c) preciptation
 *   d) forcast for sun or precip / clouds etc.
 * 3) brainstorm next feat to add
 */

const AppContext = createContext();
export { AppContext };

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json
            ?key=7e7e986488a04a789cf233454232911
            &q=colorado
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
  }, []);

  

  console.log("data in app", data);

  
  return (
    <AppContext.Provider value={{ data }}>
      <Header />
      <Forecast />
      <Footer />
    </AppContext.Provider>
  );
}
