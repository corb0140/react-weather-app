import "./FeedbackBar.css";

export default function FeedbackBar(props) {
  return (
    <div className="feedback">
      <p className="feedback-text">No matching locations</p>
      <span
        className="material-symbols-outlined feedback-close"
        onClick={props.close}
      >
        close
      </span>
    </div>
  );
}
