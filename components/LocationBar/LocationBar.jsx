import "./LocationBar.css";

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
                shake={props.shake}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
