import { useContext, useState, useEffect } from "react";
import styles from "./forcast.module.css";
import { AppContext } from "../../App";
import uuid from "react-uuid";
import { BsSnow2 } from "react-icons/bs";

export default function Forecast() {
  const { data, darkMode, setDarkMode, clickedResult } = useContext(AppContext);
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

  const stylesDateColor = {
    color: darkMode ? "hsl(0 0% 75% / 0.8)" : "hsl(0 0% 35% / 0.8)",
    transition: "color 1s ease",
  };

  const stylesTextColor = {
    color: darkMode ? "hsl(0 0% 93% / 0.98)" : "hsl(0 0% 4% / 0.8)",
    transition: "color 1s ease",
  };

  const stylesForecast = {
    backgroundColor: darkMode
      ? "hsl(200, 15%, 12%, 0.8)"
      : "hsl(200, 30%, 89%, 0.8)",
    boxShadow: darkMode
      ? `0 1px inset hsl(0 0% 99% / 0.5),
          0 -10px 20px 10px hsl(0 0% 0% / 0.5) inset,
          0 10px 20px 10px hsl(0 0% 50% / 0.25) inset,
          0 1px hsl(0 0% 2% / 0.75)`
      : `0 2px inset hsl(0 0% 98%),
          0 -10px 20px 10px hsl(0 0% 94% / 0.5) inset, 
          0 10px 20px 10px hsl(0 0% 78% / 0.2) inset, 
          0 2px hsl(0 0% 94%)`,
    transition: "backgroundColor 1s ease boxShadow 1s ease",
  };

  const stylesBorder = {
    border: darkMode
      ? "1px solid hsl(0 0% 100% / 0.25)"
      : "1px solid hsl(0 0% 95%)",
    transition: "border 1s ease",
  };

  const stylesMtnName = {
    color: darkMode ? "hsl(0 0% 98% / 0.925)" : "hsl(0 0% 4% / 0.8)",
    backgroundColor: darkMode ? "hsl(20, 15%, 85%)" : "hsl(20, 25%, 10%)",
    boxShadow: darkMode
      ? `0 1px inset hsl(0 0% 100% / 0.5), 
          0 -10px 20px 10px hsl(200 20% 15% / 0.5) inset,
          0 10px 20px 10px hsl(0 0% 50% / 0.25) inset,
          0 1px hsl(0 0% 2% / 0.75)`
      : `0 1px inset hsl(0 0% 100% / 0.5),
          0 -10px 20px 10px hsl(15 20% 95% / 0.5) inset,
          0 10px 20px 10px hsl(15 20% 80% / 0.2) inset, 
          0 1px hsl(0 0% 98% / 0.75)`,
    transition: "backgroundColor 1s ease, boxShadow 1s ease, color 1s ease",
  };

  function forecastPreview() {
    if (forecastData && forecastData.length > 0) {
      const html = forecastData.map((data) => {
        const { id, date, day } = data;
        const { totalsnow_cm } = day;
        const totalSnowIn = Math.round(((totalsnow_cm / 2.54) * 100) / 100);
        const dateVal = handleDate(date);
        const { dayName, dayNum } = dateVal;
        const shortDayName = dayName.slice(0, 3);

        return (
          <div
            onClick={(e) => handleForecastClick(e)}
            key={id}
            id={id}
            className={`${styles.forecastPreview} ${
              darkMode ? styles.forecastPreviewDark : ""
            }`}
          >
            <span className={styles.shortDateName} style={stylesDateColor}>
              {shortDayName}
            </span>
            <span className={styles.dateNum} style={stylesTextColor}>
              {dayNum}
            </span>
            <p className={styles.totalSnow} style={stylesTextColor}>
              {totalSnowIn}
              <span className={styles.label} style={stylesTextColor}>
                in
              </span>
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
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const num = dateObj.getUTCDate();

    return {
      dayName: days[weekDayNum],
      dayNum: num,
    };
  }

  function handleForecastClick(e) {
    if (forecastData && forecastData.length > 0) {
      const targetForecast = forecastData.filter((day) => {
        if (day.id === e.target.id) {
          return day.id;
        }
      });
      setShowFullForecast(true);
      setFullForecastData(targetForecast);
      setTargetId(e.target.id);
      setFullForecastId(targetForecast[0].id);
    } else {
      console.error("FORECAST NOT WORKING: No forecastData available.");
    }
  }

  function avgtemp(temp) {
    const avg = Math.floor(temp);
    return avg;
  }

  function ForecastDetails() {
    if (showFullForecast && fullForecastData) {
      const html = fullForecastData.map((data) => {
        const { day, date } = data;
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
        const dateVal = handleDate(date);

        return (
          <div className={styles.forecastBackground}>
            <span className={styles.forecast} style={stylesForecast}></span>
            <div
              className={styles.forecastDetailWrapper}
              style={{ ...stylesBorder, ...stylesTextColor }}
            >
              <span className={styles.dateName} style={stylesDateColor}>
                {dateVal.dayName}
              </span>
              <img src={icon} />
              <div className={styles.snowDetail}>
                <BsSnow2 />
                {totalSnowIn}
                <span className={styles.label}>in</span>
              </div>
              <div className={styles.tempContainer}>
                <span className={styles.tempWrapper}>
                  <span>Max</span>
                  {avgtemp(maxtemp_f)}°
                </span>
                <span className={styles.tempWrapper}>
                  <span>Avg</span>
                  {avgtemp(avgtemp_f)}°
                </span>
                <span className={styles.tempWrapper}>
                  <span>Min</span>
                  {avgtemp(mintemp_f)}°
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
        {clickedResult && (
          <span className={styles.mtnName} style={stylesMtnName}>
            {clickedResult && `${clickedResult}, ${locationData.region}`}
          </span>
        )}

        {showFullForecast && clickedResult && <ForecastDetails />}
        {clickedResult && (
          <div className={styles.previewWrapper}>{forecastPreview()}</div>
        )}
      </div>
    </>
  );
}
