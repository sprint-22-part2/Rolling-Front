import styles from './index.module.css';
import PropTypes from 'prop-types';
import ProfileGroup from '@/components/common/ProfileGroup';
import ReactionBadge from '@/components/reaction/ReactionBadge';
function RollingCard({ item }) {
  if (!item) {
    return null;
  }
  console.log('item', item);
  const { name, backgroundColor, topReactions } = item;
  return (
    <div className={`${styles.rollingCard} ${styles[backgroundColor]}`}>
      <div className={styles.recipient}>
        <span className={styles.to}>To</span>
        <p className={styles.name}>{name}</p>
      </div>
      <ProfileGroup />
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
    topReactions: PropTypes.arrayOf,
  }).isRequired,
};

export default RollingCard;
