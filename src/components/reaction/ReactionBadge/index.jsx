import PropTypes from 'prop-types';
import styles from './index.module.css';

export default function ReactionBadge({ emoji, count, onClick }) {
  return (
    <button type="button" className={styles.badge} onClick={onClick}>
      {emoji}
      <span className={styles.badgeGap} aria-hidden="true" />
      {count}
    </button>
  );
}

ReactionBadge.propTypes = {
  emoji: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

ReactionBadge.defaultProps = {
  onClick: null,
};
