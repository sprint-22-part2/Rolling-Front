import { useEffect, useState } from 'react';
import { getReactions } from '@/apis/reactions';

function useRollingWithReactions(fetchRecipients) {
  const [rolling, setRolling] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const recipientsRes = await fetchRecipients();

        const recipientsWithReactions = await Promise.all(
          recipientsRes.results.map(async (item) => {
            if (!item.id) {
              return { ...item, reactions: [] };
            }

            const reactionsRes = await getReactions(item.id);

            return {
              ...item,
              reactions: reactionsRes.results,
            };
          })
        );

        setRolling(recipientsWithReactions);
      } catch (error) {
        console.error('롤링 데이터 실패', error);
        setRolling([]);
      }
    }

    fetchData();
  }, [fetchRecipients]);

  return { rolling };
}

export default useRollingWithReactions;
