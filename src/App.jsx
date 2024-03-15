import "./App.css";

import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import FeedbackBar from "../components/FeedbackBar/FeedbackBar";
import LocationBar from "../components/LocationBar/LocationBar";
import Weather from "../components/Weather/Weather";
import { useState, useEffect } from "react";

function App() {
  const [error, setError] = useState(false);
  const [locations, setLocations] = useState([]);

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

  //spin card
  const shakeCard = (ev) => {
    console.log(ev.target);
    if (ev.target) {
      ev.target.classList.add("shake");

      setTimeout(() => {
        ev.target.classList.remove("shake");
        console.warn("Don't touch me buddy! I'm warning you!");
      }, 500);
    }
  };

  useEffect(() => {
    if (locations.length === 0) {
      return;
    }
    console.log("locations", locations);
  }, [locations]);

  return (
    <>
      <Header />

      <main>
        <SearchBar addLocation={addLocation} />
        {error && <FeedbackBar close={closeFeedback} />}
        <LocationBar
          card={locations}
          shake={shakeCard}
          removeLocation={removeLocation}
        ></LocationBar>
        <Weather></Weather>
      </main>
    </>
  );
}

export default App;
