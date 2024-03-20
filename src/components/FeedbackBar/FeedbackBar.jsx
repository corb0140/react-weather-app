import "./FeedbackBar.css";

import { PropTypes } from "prop-types";

export default function FeedbackBar({ message, close }) {
  return (
    <div className="feedback">
      <p className="feedback-text">{message}</p>
      <span
        className="material-symbols-outlined feedback-close"
        onClick={close}
      >
        close
      </span>
    </div>
  );
}

FeedbackBar.propTypes = {
  message: PropTypes.string,
  close: PropTypes.func,
};
