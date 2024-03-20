import "./LocationBar.css";
import { PropTypes } from "prop-types";

import LocationCard from "../LocationCard/LocationCard";

export default function LocationBar({ card, removeLocation, getWeather }) {
  return (
    <div className="location-bar">
      <div className="container">
        <ul id="location-list" className="location-list">
          {card.length > 0 &&
            card.map((card) => (
              <LocationCard
                key={card.id}
                name={card.name}
                country={card.country}
                remove={(ev) => removeLocation(card.id, ev)}
                getWeather={() => getWeather(card.id)}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

LocationBar.propTypes = {
  card: PropTypes.array.isRequired,
  removeLocation: PropTypes.func.isRequired,
  getWeather: PropTypes.func.isRequired,
};
