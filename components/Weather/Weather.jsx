import { useState } from "react";
import "./Weather.css";

import Loading from "../Loading/Loading";

export default function Weather({ weather }) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="weather">
      <div className="container">
        {loading && <Loading />}

        <h2 className="weather-title" onClick={() => setLoading(!loading)}>
          Weather for {weather.city}
        </h2>

        {!loading && (
            <img src={weather.icon} alt={"image of " + weather.src} />
          ) && (
            <div className="weather-content">
              <p className="weather-content--text">
                {weather.main} - {weather.description}
              </p>
              <p className="weather-content--text">{weather.temp}</p>
              <p className="weather-content--text">{weather.feel_like}</p>
              <p className="weather-content--text">{weather.wind_speed}</p>
            </div>
          )}
      </div>
    </div>
  );
}
