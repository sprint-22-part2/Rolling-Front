import styles from './index.module.css';
import RollingCard from '@/components/main/RollingCard';
import { getRecipients } from '@/apis/recipients';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';

function RecentRolling() {
  const [rolling, setRolling] = useState([]);
  const [rollingCounts, setrollingCounts] = useState(8);

  useEffect(() => {
    async function rec() {
      const recipients = await getRecipients({ limit: 8 });
      setRolling(recipients.results);
    }
    rec();
  }, []);

  function handleMore() {
    setrollingCounts((prev) => prev + 8);
  }

  const firstRolling = rolling.slice(0, rollingCounts);
  return (
    <div className={styles.recentRolling}>
      {firstRolling?.map((item) => (
        <Link
          className={styles.RollingCard}
          key={item.id}
          type={item.id}
          to={'/post/' + item.id}
        >
          <RollingCard item={item} />
        </Link>
      ))}

      {rollingCounts < rolling.length ? (
        <div className={styles.buttonWrap}>
          <Button
            size="sizeBig"
            variant="variantGray"
            onClick={() => handleMore()}
          >
            더보기
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default RecentRolling;
