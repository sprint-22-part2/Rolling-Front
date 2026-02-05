import styles from './index.module.css';
import RollingCard from '@/components/list/RollingCard';
import { getRecipients } from '@/apis/recipients';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';

const LIMIT = 8;

function RecentRolling() {
  const [rolling, setRolling] = useState([]);
  const [nextRolling, setNextRolling] = useState(null);

  useEffect(() => {
    async function fetchRecipients() {
      try {
        const recentRecipients = await getRecipients({ limit: LIMIT });
        setRolling(recentRecipients.results);
        setNextRolling(recentRecipients.next);
      } catch (error) {
        console.error('Failed to fetch recipients:', error);
      }
    }
    fetchRecipients();
  }, []);
  const handleLoadMore = useCallback(async () => {
    try {
      const response = await getRecipients({
        offset: rolling.length,
        limit: LIMIT,
      });
      const { results } = response;
      setRolling((prevItems) => [...prevItems, ...results]);
      setNextRolling(response.next);
    } catch (error) {
      console.error('Failed to fetch more recipients:', error);
    }
  }, [rolling]);

  return (
    <div className={styles.recentRolling}>
      {rolling?.map((item) => (
        <Link
          className={styles.RollingCard}
          key={item.id}
          to={`/post/${item.id}`}
        >
          <RollingCard item={item} />
        </Link>
      ))}

      {nextRolling !== null && (
        <div className={styles.buttonWrap}>
          <Button size="sizeBig" variant="variantGray" onClick={handleLoadMore}>
            더보기
          </Button>
        </div>
      )}
    </div>
  );
}

export default RecentRolling;
