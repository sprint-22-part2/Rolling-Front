import styles from './index.module.css';
import PropTypes from 'prop-types';
import ProfileGroup from '@/components/common/ProfileGroup';
import ReactionBadge from '@/components/reaction/ReactionBadge';
import { REACTION_THEMES } from '@/components/reaction/reactionThemes';
function RollingCard({ item }) {
  if (!item) {
    return null;
  }
  const {
    name,
    backgroundColor,
    topReactions,
    recentMessages,
    backgroundImageURL,
  } = item;
  const profiles = recentMessages.map((message) => ({
    id: message.id,
    src: message.profileImageURL,
    alt: message.sender,
  }));
  const theme = backgroundImageURL ? styles.image : styles[backgroundColor];

  const badgeTheme = backgroundImageURL
    ? REACTION_THEMES.trans
    : REACTION_THEMES[backgroundColor];

  const textColor = backgroundImageURL ? 'var(--gray-200)' : 'var(--gray-700)';

  return (
    <div
      className={`${styles.rollingCard} ${theme}`}
      style={
        backgroundImageURL
          ? { backgroundImage: `url(${backgroundImageURL})` }
          : undefined
      }
    >
      <div className={styles.recipient}>
        <span className={styles.to}>To</span>
        <p className={styles.name}>{name}</p>
      </div>

      <ProfileGroup profiles={profiles} textColor={textColor} />
      <div className={styles.emojis}>
        {topReactions?.map((reaction) => (
          <ReactionBadge
            key={reaction.id}
            emoji={reaction.emoji}
            count={reaction.count}
            theme={badgeTheme}
          />
        ))}
      </div>
    </div>
  );
}

RollingCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    backgroundImageURL: PropTypes.string,
    messageCount: PropTypes.number.isRequired,
    recentMessages: PropTypes.number.isRequired,
    topReactions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        emoji: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      })
    ),
  }),
};

export default RollingCard;
