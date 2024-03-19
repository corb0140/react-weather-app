import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";

import Loading from "../Loading/Loading";
import "./Weather.css";

export default function Weather({ isLoading: isLoading, weather: weather }) {
  const [showWeatherData, setShowWeatherData] = useState(true);
  let loading = { isLoading };

  useEffect(() => {
    if (weather.city !== undefined) setShowWeatherData(false);
    else setShowWeatherData(true);
  }, [weather]);

  return (
    <div className="weather">
      <div className="container">
        {loading.isLoading && <Loading />}

        {showWeatherData ? (
          <h2 className="weather-title">No Location Selected</h2>
        ) : (
          <h2 className="weather-title">Weather for {weather.city}</h2>
        )}

        {showWeatherData ? (
          ""
        ) : (
          <div className="weather-info--wrapper">
            <img
              src={weather.icon}
              alt={"icon image of " + weather.description}
            />

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

Weather.propTypes = {
  isLoading: PropTypes.bool,
  weather: PropTypes.object,
};
