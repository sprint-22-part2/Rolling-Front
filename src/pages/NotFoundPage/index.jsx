import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import styles from './index.module.css';
import { useCallback } from 'react';

import { AirplaneIcon } from '@/assets/icons';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <AirplaneIcon className={styles.airplane} />
        <p className={styles.desc}>접근 불가한 페이지 입니다</p>

        <Button
          size="sizeMd"
          className={styles.homeButton}
          onClick={handleGoHome}
        >
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
