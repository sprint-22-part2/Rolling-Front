import styles from './index.module.css';
import PropTypes from 'prop-types';
import RollingCard from '@/components/main/RollingCard';

function RecentRolling({ theme = 'blue', recipientName = 'recipientName' }) {
  return (
    <div className={styles.recentRolling}>
      <div className={styles.RollingCard}>
        <RollingCard theme={theme} recipientName={recipientName} />
      </div>
    </div>
  );
}
RecentRolling.propTypes = {
  theme: PropTypes.string.isRequired,
  recipientName: PropTypes.string.isRequired,
};
export default RecentRolling;
