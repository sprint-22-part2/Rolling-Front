import styles from './index.module.css';
import PropTypes from 'prop-types';
import ProfileGroup from '@/components/common/ProfileGroup';
import ReactionBadge from '@/components/reaction/ReactionBadge';
function RollingCard({ item }) {
  const { name, backgroundColor } = item;
  if (!item) {
    return null;
  }
  return (
    <div className={`${styles.rollingCard} ${styles[backgroundColor]}`}>
      <div className={styles.recipient}>
        <span className={styles.to}>To</span>
        <p className={styles.name}>{name}</p>
      </div>
      <ProfileGroup />
      <div className={styles.emojis}>
        {item.reactions?.map((reaction) => (
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
    reactions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        emoji: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};

export default RollingCard;
