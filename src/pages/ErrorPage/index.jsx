import Button from '@/components/common/Button';
import styles from './index.module.css';
import { AirplaneIcon } from '@/assets/icons';
function ErrorPage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container} role="alert">
      <div className={styles.row}>
        <AirplaneIcon className={styles.airplane} />
        <p className={styles.desc}>일시적인 오류가 발생했어요.</p>
        <Button
          size="sizeMd"
          className={styles.retryButton}
          onClick={handleRetry}
        >
          다시 시도
        </Button>
      </div>
    </div>
  );
}

export default ErrorPage;
