import styles from './Index.module.css';
import RollingCard from '@/components/RollingList/RollingCard';

function RecentRolling() {
  return (
    <div className={styles.recentRolling}>
      <div className={styles.RollingCard}>
        <RollingCard theme="pink" />
      </div>
      <div className={styles.RollingCard}>
        <RollingCard theme="image" />
      </div>
      <div className={styles.RollingCard}>
        <RollingCard theme="orange" />
      </div>
      <div className={styles.RollingCard}>
        <RollingCard theme="" />
      </div>
      <div className={styles.RollingCard}>
        <RollingCard theme="yellow" />
      </div>
      <div className={styles.RollingCard}>
        <RollingCard theme="pink" />
      </div>
      <div className={styles.RollingCard}>
        <RollingCard theme="image" />
      </div>
      <div className={styles.RollingCard}>
        <RollingCard theme="pink" />
      </div>
    </div>
  );
}

export default RecentRolling;
