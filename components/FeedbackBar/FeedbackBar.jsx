import "./FeedbackBar.css";

export default function FeedbackBar() {
  return (
    <div className="feedback">
      <p className="feedback-text">No matching locations</p>
      <span className="material-symbols-outlined feedback-close">close</span>
    </div>
  );
}
