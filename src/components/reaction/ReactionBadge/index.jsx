import PropTypes from 'prop-types';
import styles from './index.module.css';

export default function ReactionBadge({
  emoji,
  count,
  onClick,
  theme = {
    chipBg: 'var(--blue-200)',
    text: 'var(--blue-400)',
  },
}) {
  return (
    <button
      type="button"
      className={styles.badge}
      onClick={onClick}
      style={{
        '--rb-chip-bg': theme.chipBg,
        '--rb-text': theme.text,
      }}
    >
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
  theme: PropTypes.shape({
    chipBg: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

ReactionBadge.defaultProps = {
  onClick: null,
};
