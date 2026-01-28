import styles from './index.module.css';
import PropTypes from 'prop-types';
import ProfileGroup from '@/components/common/ProfileGroup';
import { Link } from 'react-router-dom';

function RollingCard({ item }) {
  return (
    <Link to={`/post/${item.id}`}>
      <div className={`${styles.rollingCard} ${styles[item.backgroundColor]}`}>
        <div className={styles.recipient}>
          <span className={styles.to}>To</span>
          <p className={styles.name}>{item.name}</p>
        </div>
        <ProfileGroup item={item} />
        <div className={styles.emojis}>
          <div className={styles.emoji}>🥲 23</div>
          <div className={styles.emoji}>🥲 203</div>
          <div className={styles.emoji}>🥲 2663</div>
        </div>
      </div>
    </Link>
  );
}

RollingCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    // 필요한 필드 더 추가 가능
  }).isRequired,
};
export default RollingCard;
