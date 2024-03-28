import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import FeedbackBar from "./components/FeedbackBar/FeedbackBar";
import LocationBar from "./components/LocationBar/LocationBar";
import Weather from "./components/Weather/Weather";
import { useState, useEffect } from "react";

function App() {
  // feedback states
  const [error, setError] = useState(false);
  const [feedBackMessage, setFeedBackMessage] = useState("");
  const [timer, setTimer] = useState(null);

  // location state
  const [locations, setLocations] = useState([]);

  // weather states
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [coords, setCoords] = useState({ lat: null, lon: null });

  //show feedback
  const showFeedback = () => {
    setError(true);
    setFeedBackMessage("No matching locations");
  };

  // close feedback
  const closeFeedback = () => {
    setError(false);
    setFeedBackMessage("");
  };

  useEffect(() => {
    if (feedBackMessage === "" || feedBackMessage === null) {
      // clear setTimeout for feedback message incase someone searches again before the 3 seconds
      clearTimeout(timer);
      return;
    } else if (
      feedBackMessage === "No matching locations" ||
      feedBackMessage === "Maximum of 5 locations reached" ||
      feedBackMessage === "No location matching these coordinates"
    ) {
      // remove feedback message after 3 seconds
      setTimer(
        setTimeout(() => {
          setFeedBackMessage("");
          setError(false);
        }, 3000)
      );
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

    // clear weather data when there are no locations
    if (locations.length === 0) {
      setWeatherData({});
    }

    ev.stopPropagation();
  };

  // get weather
  const getWeather = (id) => {
    const index = locations.findIndex((location) => location.id === id);
    const location = locations[index];
    setCoords({ lat: location.lat, lon: location.lon });
  };

  useEffect(() => {
    if (locations.length === 0) {
      return;
    }

    // show loading sequence before making api call
    setIsLoading(true);

    //call openweathermap api to get the weather
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Incorrect Latitude & or Longitude");

        return response.json();
      })
      .then((data) => {
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
      .catch(() => {
        setError(true);
        setFeedBackMessage("No location matching these coordinates");
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {};
  }, [coords]);

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
        />
        <Weather weather={weatherData} isLoading={isLoading}></Weather>
      </main>
    </>
  );
}

export default App;
