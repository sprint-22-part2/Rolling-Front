import styles from './index.module.css';
// import PropTypes from 'prop-types';
import RollingCard from '@/components/main/RollingCard';
import { getRecipients } from '@/apis/recipients';
import { useEffect, useState } from 'react';

function RecentRolling() {
  const [rolling, setRolling] = useState([]);

  useEffect(() => {
    async function rec() {
      const recipients = await getRecipients();
      setRolling(recipients);
    }
    rec();
  }, []);

  return (
    <div className={styles.recentRolling}>
      {rolling.results?.map((item) => (
        <div className={styles.RollingCard} key={item.id}>
          <RollingCard item={item} />
        </div>
      ))}
    </div>
  );
}
// RecentRolling.propTypes = {
//   theme: PropTypes.string.isRequired,
// };
export default RecentRolling;
