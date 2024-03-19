import "./LocationBar.css";
import { PropTypes } from "prop-types";

import LocationCard from "../LocationCard/LocationCard";

export default function LocationBar(props) {
  const card = props.card;
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
                remove={(ev) => props.removeLocation(card.id, ev)}
                getWeather={() => props.getWeather(card.id)}
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
