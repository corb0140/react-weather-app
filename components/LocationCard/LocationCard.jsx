import "./LocationCard.css";

export default function LocationCard(props) {
  return (
    <li className="card">
      <h2 className="card-city">{props.name}</h2>
      <p className="card-country">{props.country}</p>
      <button className="card-button btn" onClick={props.remove}>
        Remove
      </button>
    </li>
  );
}
