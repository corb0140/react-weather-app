import "./Loading.css";

export default function Loading() {
  return (
    <div>
      <div className="container">
        <p className="loading">
          Loading
          <span className="loading-dot loading-dot--1">.</span>
          <span className="loading-dot loading-dot--2">.</span>
          <span className="loading-dot loading-dot--3">.</span>
        </p>
      </div>
    </div>
  );
}
