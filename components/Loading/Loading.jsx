import "./Loading.css";

export default function Loading() {
  return (
    <div>
      <div className="container">
        <p className="loading">
          Loading
          <span className="loading__dot">.</span>
          <span className="loading__dot">.</span>
          <span className="loading__dot">.</span>
        </p>
      </div>
    </div>
  );
}
