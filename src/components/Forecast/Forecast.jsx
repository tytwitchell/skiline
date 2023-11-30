import { useContext, useState, useEffect } from "react";
import styles from "./forcast.module.css";
import { AppContext } from "../../App";

export default function Forecast() {
  const { data } = useContext(AppContext);
  const [apiData, setApiData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [forecastData, setForecastData] = useState([]);

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
        setForecastData(forecastday);
      }
    }
  }, [apiData]);

  console.log("forecastData", forecastData);

  

  function forecastPreview() {
    if (forecastData && forecastData.length > 0) {
      const html = forecastData.map((data) => {
        const { date, day } = data
        const { daily_chance_of_snow, daily_will_it_snow, totalsnow_cm } = day;
        const totalSnowIn = Math.round((totalsnow_cm / 2.54 * 100) / 100)
        const dateVal = handleDate(date);
      

        return (
          <div key={date} className={styles.forecastPreview}>
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
      dayNum: num
    };
  }


  return (
    <>
      <div className={styles.forcastContainer}>
        {/* <span className={styles.empty}></span> */}
        <h3 className={styles.mtnName}>{locationData.name}</h3>
        <div className={styles.previewWrapper}>{forecastPreview()}</div>
      </div>
    </>
  );
}
