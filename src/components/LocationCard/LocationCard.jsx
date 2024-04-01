import "./LocationCard.css";
import { PropTypes } from "prop-types";

export default function LocationCard({
  name,
  country,
  remove,
  getWeather,
  activeCard,
}) {
  return (
    <li className={activeCard} onClick={getWeather}>
      <h2 className="card-city">{name}</h2>
      <p className="card-country">{country}</p>
      <button className="card-button btn" onClick={remove}>
        Remove
      </button>
    </li>
  );
}

LocationCard.propTypes = {
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  getWeather: PropTypes.func.isRequired,
};
