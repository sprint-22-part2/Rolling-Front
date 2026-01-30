import styles from './index.module.css';
import { PlusIcon } from '@/assets/icons';
function AddMessage() {
  return (
    <div className={styles.addMessage}>
      <div className={styles.icon}>
        <PlusIcon />
      </div>
      <p className={styles.text}>메세지 추가하기</p>
    </div>
  );
}

export default AddMessage;
