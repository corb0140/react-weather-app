import "./App.css";

import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import FeedbackBar from "../components/FeedbackBar/FeedbackBar";
import LocationBar from "../components/LocationBar/LocationBar";
import Weather from "../components/Weather/Weather";
import { useState, useEffect, useRef } from "react";

function App() {
  const [error, setError] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weatherData, setWeatherData] = useState("");
  const latRef = useRef(null);
  const lonRef = useRef(null);

  // add location
  const addLocation = (location) => {
    setLocations([...locations, location]);
  };

  // close feedback
  const closeFeedback = () => {
    setError(false);
  };

  //remove Location
  const removeLocation = (id, ev) => {
    const index = locations.findIndex((location) => location.id === id);
    locations.splice(index, 1);
    setLocations([...locations]);

    ev.stopPropagation();
  };

  // get weather]
  const getWeather = (id) => {
    const index = locations.findIndex((location) => location.id === id);
    const location = locations[index];
    latRef.current = `${location.lat}`;
    lonRef.current = `${location.lon}`;
    console.log(latRef.current, lonRef.current);
  };

  useEffect(() => {
    if (locations.length === 0) {
      return;
    }

    //call openweathermap api to get the weather
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latRef.current}&lon=${lonRef.current}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Incorrect Latitude & or Longitude");

        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData({
          city: data.name,
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
          main: data.weather[0].main,
          description: data.weather[0].description,
          temp: data.main.temp,
          feel_like: data.main.feels_like,
          wind_speed: data.wind.speed,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("locations", locations);
  }, []);

  return (
    <>
      <Header />

      <main>
        <SearchBar addLocation={addLocation} />
        {error && <FeedbackBar close={closeFeedback} />}
        <LocationBar
          card={locations}
          getWeather={getWeather}
          removeLocation={removeLocation}
        ></LocationBar>
        <Weather weather={weatherData}></Weather>
      </main>
    </>
  );
}

export default App;
