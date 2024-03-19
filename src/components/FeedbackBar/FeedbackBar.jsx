import "./FeedbackBar.css";

import { PropTypes } from "prop-types";

export default function FeedbackBar(props) {
  return (
    <div className="feedback">
      <p className="feedback-text">{props.message}</p>
      <span
        className="material-symbols-outlined feedback-close"
        onClick={props.close}
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
