import "./App.css";

import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import FeedbackBar from "../components/FeedbackBar/FeedbackBar";
import LocationBar from "../components/LocationBar/LocationBar";
import Weather from "../components/Weather/Weather";
import { useState, useEffect, useRef } from "react";

function App() {
  // feedback states
  const [error, setError] = useState(false);
  const [feedBackMessage, setFeedBackMessage] = useState("");
  // location state
  const [locations, setLocations] = useState([]);
  // weather states & refs
  const [weatherData, setWeatherData] = useState("");
  const [weatherState, setWeatherState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const latRef = useRef(null);
  const lonRef = useRef(null);

  //show feedback
  const showFeedback = () => {
    setError(true);
    setFeedBackMessage("No matching locations");
  };

  // close feedback
  const closeFeedback = () => {
    setError(false);
  };

  // remove feedback message after 3 seconds
  useEffect(() => {
    if (feedBackMessage === "" || feedBackMessage === null) {
      return;
    } else if (
      feedBackMessage === "No matching locations" ||
      feedBackMessage === "Maximum of 5 locations reached"
    ) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }

    return () => {};
  }, [feedBackMessage]);

  // add location
  const addLocation = (location) => {
    if (locations.length < 5) {
      setLocations([...locations, location]);
    } else {
      // show feedback component when there are 5 locations
      setError(true);
      setFeedBackMessage("Maximum of 5 locations reached");
    }
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
    latRef.current = location.lat;
    lonRef.current = location.lon;

    setWeatherState(!weatherState);
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

        // show loading before making api call
        setIsLoading(true);

        return response.json();
      })
      .then((data) => {
        setTimeout(() => {
          setWeatherData({
            city: data.name,
            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
            main: data.weather[0].main,
            description: data.weather[0].description,
            temp: data.main.temp,
            feel_like: data.main.feels_like,
            wind_speed: data.wind.speed,
          });
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      });

    // console.log("loading", isLoading);
    // console.log("locations", locations);

    return () => {};
  }, [latRef.current, lonRef.current]);

  return (
    <>
      <Header />

      <main>
        <SearchBar addLocation={addLocation} error={showFeedback} />
        {error && (
          <FeedbackBar message={feedBackMessage} close={closeFeedback} />
        )}
        <LocationBar
          card={locations}
          getWeather={getWeather}
          removeLocation={removeLocation}
        ></LocationBar>
        <Weather weather={weatherData} isLoading={isLoading}></Weather>
      </main>
    </>
  );
}

export default App;
