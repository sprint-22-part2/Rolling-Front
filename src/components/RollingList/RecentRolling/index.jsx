<<<<<<< HEAD
import styles from './index.module.css';
import RollingCard from '../RollingCard';
=======
import styles from './Index.module.css';
import PropTypes from 'prop-types';
import RollingCard from '@/components/RollingList/RollingCard';
>>>>>>> 9b57446 (이름 프롭으로 변경)

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
