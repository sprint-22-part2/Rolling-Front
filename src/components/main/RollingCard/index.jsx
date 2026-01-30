import styles from './index.module.css';
import PropTypes from 'prop-types';
import ProfileGroup from '@/components/common/ProfileGroup';

function RollingCard({ theme = 'yellow', recipientName = 'recipientName' }) {
  return (
    <div className={`${styles.rollingCard} ${styles[theme]}`}>
      <div className={styles.recipient}>
        <span className={styles.to}>To</span>
        <p className={styles.name}>{recipientName}</p>
      </div>
      <ProfileGroup />
      <div className={styles.emojis}>
        <div className={styles.emoji}>🥲 23</div>
        <div className={styles.emoji}>🥲 203</div>
        <div className={styles.emoji}>🥲 2663</div>
      </div>
    </div>
  );
}

RollingCard.propTypes = {
  theme: PropTypes.string.isRequired,
  recipientName: PropTypes.string.isRequired,
};
export default RollingCard;
