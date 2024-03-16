import { useEffect, useState } from "react";
import "./Weather.css";

import Loading from "../Loading/Loading";

export default function Weather({ weather }) {
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (weather) {
      setLoading(true);
    }
  }, [weather]);

  return (
    <div className="weather">
      <div className="container">
        {!loading ? (
          <h2 className="weather-title">No Location Selected</h2>
        ) : (
          <h2 className="weather-title">Weather for {weather.city}</h2>
        )}

        {!loading ? (
          ""
        ) : (
          <div className="weather-info--wrapper">
            <img src={weather.icon} alt={"image of " + weather.src} />

            <div className="weather-content">
              <p className="weather-content--text">
                {weather.main} - {weather.description}
              </p>
              <p className="weather-content--text">
                Temperature: {weather.temp} °C
              </p>
              <p className="weather-content--text">
                Feels like: {weather.feel_like} °C
              </p>
              <p className="weather-content--text">
                Wind: {weather.wind_speed} m/s
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
