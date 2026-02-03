import styles from './index.module.css';
import RollingCard from '@/components/main/RollingCard';
import { getRecipients } from '@/apis/recipients';
import { getReactions } from '@/apis/reations';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';

function RecentRolling() {
  const [rolling, setRolling] = useState([]);
  const [rollingCounts, setRollingCounts] = useState(8);
  const [reactions, setReactions] = useState('');

  useEffect(() => {
    async function rec() {
      const recipients = await getRecipients();
      setRolling(recipients.results);
    }
    rec();
  }, []);

  useEffect(() => {
    async function rec() {
      const reactions = await getReactions(15999);
      setReactions(reactions.results);
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
          to={`/post/${item.id}`}
        >
          <RollingCard item={item} reactions={reactions} />
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
