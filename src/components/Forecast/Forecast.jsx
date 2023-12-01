import { useContext, useState, useEffect } from "react";
import styles from "./forcast.module.css";
import { AppContext } from "../../App";
import uuid from "react-uuid";


export default function Forecast() {
  const { data } = useContext(AppContext);
  const [apiData, setApiData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [fullForecast, setFullForecast] = useState(false);

  useEffect(() => {
    if (data) {
      setApiData(data);
    }
  }, [data]);

  useEffect(() => {
    if (apiData) {
      const location = { ...apiData.location };
      setLocationData(location);
      if (apiData.forecast) {
        const { forecastday } = apiData.forecast;
        const newDayData = forecastday.map(day => {
          const id = uuid();
          return {
            ...day,
            id,
          };
        })
        setForecastData(newDayData);
      }
    }
  }, [apiData]);

  console.log("forecastData", forecastData);

  function forecastPreview() {
    if (forecastData && forecastData.length > 0) {
      const html = forecastData.map((data) => {
        const { date, day } = data;
        const { daily_chance_of_snow, daily_will_it_snow, totalsnow_cm } = day;
        const totalSnowIn = Math.round(((totalsnow_cm / 2.54) * 100) / 100);
        const dateVal = handleDate(date);

        return (
          <div
            onClick={(e) => handleForecastClick(e)}
            key={uuid()}
            className={styles.forecastPreview}
          >
            <span className={styles.dateName}>{dateVal.dayName}</span>
            <span className={styles.dateNum}>{dateVal.dayNum}</span>
            <p className={styles.totalSnow}>
              {totalSnowIn}
              <span>in</span>
            </p>
          </div>
        );
      });

      return html;
    } else {
      console.log("HTML NOT WORKING");
    }
  }

  function handleDate(date) {
    const dateObj = new Date(date);
    const weekDayNum = dateObj.getDay();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const num = dateObj.getUTCDate();
    return {
      dayName: days[weekDayNum + 1],
      dayNum: num,
    };
  }

  function handleForecastClick(e) {
    console.log(e)
    setFullForecast(prev => !prev)
  }

  function ForecastDetails() {
    /**
     *   a) snow fall
     *   b) temp
     *   c) preciptation
     *   d) forcast for sun or precip / clouds etc.
     */



    return <div className={styles.forecastDetailWrapper}>Full Forecast!!</div>;
  }

  return (
    <>
      <div className={styles.forecastContainer}>
        <h3 className={styles.mtnName}>{locationData.name}</h3>
        {fullForecast && <ForecastDetails />}
        <div className={styles.previewWrapper}>{forecastPreview()}</div>
      </div>
    </>
  );
}
