import styles from './index.module.css';
import PropTypes from 'prop-types';
import ProfileGroup from '@/components/common/ProfileGroup';
import ReactionBadge from '@/components/reaction/ReactionBadge';
function RollingCard({ item }) {
  if (!item) {
    return null;
  }
  const { name, backgroundColor, topReactions, recentMessages, messageCount } =
    item;
  const profiles = recentMessages.map((message) => ({
    id: message.id,
    src: message.profileImageURL,
    alt: message.sender,
  }));
  return (
    <div className={`${styles.rollingCard} ${styles[backgroundColor]}`}>
      <div className={styles.recipient}>
        <span className={styles.to}>To</span>
        <p className={styles.name}>{name}</p>
      </div>

      <ProfileGroup profiles={profiles} totalCount={messageCount} />

      <div className={styles.emojis}>
        {topReactions?.map((reaction) => (
          <ReactionBadge
            key={reaction.id}
            emoji={reaction.emoji}
            count={reaction.count}
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
