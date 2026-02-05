import PropTypes from 'prop-types';
import styles from './index.module.css';
import { REACTION_THEMES } from '@/components/reaction/reactionThemes';

export default function ReactionBadge({
  emoji,
  count,
  onClick,
  theme,
  className,
}) {
  const safeTheme = theme ?? REACTION_THEMES.blue;
  return (
    <button
      type="button"
      className={`${styles.badge} ${className || ''}`}
      onClick={onClick}
      style={{
        '--rb-chip-bg': safeTheme.chipBg,
        '--rb-text': safeTheme.text,
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
  className: PropTypes.string,
};

ReactionBadge.defaultProps = {
  onClick: null,
  theme: undefined,
  className: '',
};
