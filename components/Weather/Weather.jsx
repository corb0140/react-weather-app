import "./Weather.css";

import Loading from "../Loading/Loading";

export default function Weather(props) {
  return (
    <div className="weather">
      <div className="container">
        <Loading />

        <h2 className="weather-title">Weather for {props.city}</h2>

        <img src="" alt="" />

        <div className="weather-content">
          <p className="weather-content--text"></p>
          <p className="weather-content--text"></p>
          <p className="weather-content--text"></p>
          <p className="weather-content--text"></p>
        </div>
      </div>
    </div>
  );
}
