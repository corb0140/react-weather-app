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

  const addLocation = (location) => {
    setLocations([...locations, location]);
  };

  const closeFeedback = () => {
    setError(false);
  };

  const removeLocation = (id) => {
    const index = locations.findIndex((location) => location.id === id);
    locations.splice(index, 1);
    setLocations([...locations]);
  };

  useEffect(() => {
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
          removeLocation={removeLocation}
        ></LocationBar>
        <Weather></Weather>
      </main>
    </>
  );
}

export default App;
