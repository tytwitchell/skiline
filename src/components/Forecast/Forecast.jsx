import { useContext, useState, useEffect } from "react";
import styles from "./forcast.module.css";
import { AppContext } from "../../App";
import uuid from "react-uuid";
import { BsSnow2 } from "react-icons/bs";

export default function Forecast() {
  const { data } = useContext(AppContext);
  const [apiData, setApiData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [showFullForecast, setShowFullForecast] = useState(false);
  const [fullForecastData, setFullForecastData] = useState([]);
  const [targetId, setTargetId] = useState(null);
  const [fullForecastId, setFullForecastId] = useState(null);

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
        const newDayData = forecastday.map((day) => {
          const id = uuid();
          return {
            ...day,
            id,
          };
        });
        setForecastData(newDayData);
      }
    }
  }, [apiData]);

  function forecastPreview() {
    if (forecastData && forecastData.length > 0) {
      const html = forecastData.map((data) => {
        const { id, date, day } = data;
        const { daily_chance_of_snow, daily_will_it_snow, totalsnow_cm } = day;
        const totalSnowIn = Math.round(((totalsnow_cm / 2.54) * 100) / 100);
        const dateVal = handleDate(date);

        return (
          <div
            onClick={(e) => handleForecastClick(e)}
            key={id}
            id={id}
            className={styles.forecastPreview}
          >
            <span className={styles.dateName}>{dateVal.dayName}</span>
            <span className={styles.dateNum}>{dateVal.dayNum}</span>
            <p className={styles.totalSnow}>
              {totalSnowIn}
              <span className={styles.label}>in</span>
            </p>
          </div>
        );
      });

      return html;
    } else {
      console.error("FORECAST PREVIEW NOT WORKING: No forecastData available.");
    }
  }

  function handleDate(date) {
    const dateObj = new Date(date);
    const weekDayNum = dateObj.getDay() < 6 ? dateObj.getDay() + 1 : 0;
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const num = dateObj.getUTCDate();

    return {
      dayName: days[weekDayNum],
      dayNum: num,
    };
  }

  function handleForecastClick(e) {
    if (forecastData && forecastData.length > 0) {
      const targetForecast = forecastData.filter((day) => {
        return day.id === e.target.id;
      });
      setFullForecastData(targetForecast);
      setTargetId(e.target.id);
      setFullForecastId(targetForecast[0].id);
    } else {
      console.error("FORECAST NOT WORKING: No forecastData available.");
    }

    if (fullForecastData) {
      fullForecastData.id === e.target.id
        ? setShowFullForecast(false)
        : setShowFullForecast(true);
    }
  }

  // useEffect(() => {
  //   if (fullForecastId && targetId) {
  //     console.log(fullForecastId, targetId);

  //    fullForecastId === targetId
  //      ?  setShowFullForecast(false)
  //      :  setShowFullForecast(true);
  //   }
  // }, [targetId]);

  // console.log(fullForecastData);
  //
  function ForecastDetails() {
    /**
     * connect id with click event and render appropriate data
     *   a) snow fall
     *   b) temp
     *   c) preciptation
     *   d) forcast for sun or preci4p / clouds etc.
     * condition:
     *  code: 1009
     *  icon: "//cdn.weatherapi.com/weather/64x64/day/122.png"
     *  text: "Overcast"
     * maxtemp_f
     * avgtemp_f
     * mintemp_f
     * totalprecip_in
     */
    if (showFullForecast && fullForecastData) {
      console.log(fullForecastData);
      const html = fullForecastData.map((data) => {
        const { day } = data;
        const {
          condition,
          maxtemp_f,
          avgtemp_f,
          mintemp_f,
          totalprecip_in,
          totalsnow_cm,
        } = day;
        const totalSnowIn = Math.round(((totalsnow_cm / 2.54) * 100) / 100);
        const { text, icon, code } = condition;

        return (
          <div className={styles.forecastBackground}>
            {/* <div className={styles.backdrop}> */}
            <span
              className={`${styles.action} ${
                showFullForecast ? styles.showSecondAction : ""
              }`}
            ></span>
            <div className={styles.forecastDetailWrapper}>
              <img src={icon} />
              <div className={styles.snowDetail}>
                <BsSnow2 />
                {totalSnowIn}
                <span className={styles.label}>in</span>
              </div>
              <div className={styles.tempContainer}>
                <span className={styles.tempWrapper}>
                  <span>Max</span>
                  {maxtemp_f}°
                </span>
                <span className={styles.tempWrapper}>
                  <span>Avg</span>
                  {avgtemp_f}°
                </span>
                <span className={styles.tempWrapper}>
                  <span>Min</span>
                  {mintemp_f}°
                </span>
              </div>
              {/* </div> */}
            </div>
          </div>
        );
      });
      return html;
    }
    return { html };
  }

  return (
    <>
      <div className={styles.forecastContainer}>
        <h3 className={styles.mtnName}>{locationData.name}</h3>
        {showFullForecast && <ForecastDetails />}
        <div className={styles.previewWrapper}>{forecastPreview()}</div>
      </div>
    </>
  );
}
