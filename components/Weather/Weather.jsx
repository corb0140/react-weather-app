import "./Weather.css";

import Loading from "../Loading/Loading";

export default function Weather() {
  return (
    <div className="weather">
      <div className="container">
        <h2 className="weather-title">Weather for City</h2>
        <Loading />
      </div>
    </div>
  );
}
