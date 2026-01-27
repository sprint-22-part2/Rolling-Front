import styles from './index.module.css';
import PropTypes from 'prop-types';

function RollingCard({ theme = 'yellow', recipientName = 'recipientName' }) {
  return (
    <div className={`${styles.rollingCard} ${styles[theme]}`}>
      <div className={styles.recipient}>
        <span className={styles.to}>To</span>
        <p className={styles.name}>{recipientName}</p>
      </div>
      <div className={styles.numberAuthorsWrap}>
        <div className={styles.profilePhotos}>
          <span className={styles.profilePhoto}>1</span>
          <span className={styles.profilePhoto}>2</span>
          <span className={styles.profilePhoto}>3</span>
          <span className={styles.plusNum}>+34</span>
        </div>
        <div className={styles.numberAuthor}>
          <span className={styles.number}>30</span>명이 작성했어요!
        </div>
      </div>
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
