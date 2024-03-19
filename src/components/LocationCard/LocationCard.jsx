import "./LocationCard.css";
import { PropTypes } from "prop-types";

export default function LocationCard(props) {
  return (
    <li className="card" onClick={props.getWeather}>
      <h2 className="card-city">{props.name}</h2>
      <p className="card-country">{props.country}</p>
      <button className="card-button btn" onClick={props.remove}>
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
