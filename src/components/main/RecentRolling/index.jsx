import styles from './index.module.css';
import RollingCard from '@/components/main/RollingCard';
import { getRecipients } from '@/apis/recipients';
import useRollingWithReactions from '@/hooks/useRollingWithReactions';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';

function RecentRolling() {
  const { rolling } = useRollingWithReactions(getRecipients);
  const [rollingCounts, setRollingCounts] = useState(8);

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
          <RollingCard item={item} reactions={item.reactions} />
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
