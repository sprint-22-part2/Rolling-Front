import styles from './index.module.css';
import PropTypes from 'prop-types';
import ProfileGroup from '@/components/common/ProfileGroup';
import ReactionBadge from '@/components/reaction/ReactionBadge';
function RollingCard({ item }) {
  if (!item) {
    return null;
  }
  const { name, backgroundColor } = item;

  return (
    <div className={`${styles.rollingCard} ${styles[backgroundColor]}`}>
      <div className={styles.recipient}>
        <span className={styles.to}>To</span>
        <p className={styles.name}>{name}</p>
      </div>
      <ProfileGroup />
      <div className={styles.emojis}>
        <ReactionBadge />
        <div className={styles.emoji}>🥲 23</div>
        <div className={styles.emoji}>🥲 203</div>
        <div className={styles.emoji}>🥲 2663</div>
      </div>
    </div>
  );
}

RollingCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
  }).isRequired,
};
export default RollingCard;
