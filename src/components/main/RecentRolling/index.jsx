import styles from './index.module.css';
import RollingCard from '@/components/main/RollingCard';
import { getRecipients } from '@/apis/recipients';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';

function RecentRolling() {
  const [rolling, setRolling] = useState([]);
  const [rollingCounts, setRollingCounts] = useState(8);

  useEffect(() => {
    async function rec() {
      const popularRecipients = await getRecipients();
      setRolling(popularRecipients.results);
    }
    rec();
  }, []);

  function handleMore() {
    setRollingCounts((prev) => prev + 8);
  }
  const firstRolling = rolling.slice(0, rollingCounts);
  return (
    <div className={styles.recentRolling}>
      {firstRolling?.map((item) => (
        <Link
          className={styles.RollingCard}
          key={item.id}
          to={`/list/${item.id}`}
        >
          <RollingCard item={item} />
        </Link>
      ))}

      {rollingCounts < rolling.length ? (
        <div className={styles.buttonWrap}>
          <Button size="sizeBig" variant="variantGray" onClick={handleMore}>
            더보기
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default RecentRolling;
